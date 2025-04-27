import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { CircularProgressbar } from 'recharts';

interface Project {
  id: string;
  name: string;
  progress: number;
  dailyGoal: number;
  weeklyGoal: number;
  completed: boolean;
  currentProgress: number;
}

const STORAGE_KEY = 'telegram-project-tracker';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem(STORAGE_KEY);
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: newProjectName,
        progress: 0,
        dailyGoal: 0,
        weeklyGoal: 0,
        completed: false,
        currentProgress: 0,
      };
      setProjects([...projects, newProject]);
      setNewProjectName('');
    }
  };

  const updateProgress = (projectId: string, increment: number) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const newProgress = Math.min(project.currentProgress + increment, project.dailyGoal);
        const progressPercentage = (newProgress / project.dailyGoal) * 100;
        return {
          ...project,
          currentProgress: newProgress,
          progress: progressPercentage,
          completed: progressPercentage >= 100
        };
      }
      return project;
    }));
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      ));
      setEditDialogOpen(false);
      setEditingProject(null);
    }
  };

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          label="New Project"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          fullWidth
          sx={{ mr: 1 }}
        />
        <IconButton onClick={addProject} color="primary">
          <AddIcon />
        </IconButton>
      </Box>
      <List>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            secondaryAction={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={() => updateProgress(project.id, 1)}>
                  <CheckIcon />
                </IconButton>
                <Box sx={{ width: 50, height: 50 }}>
                  <CircularProgressbar
                    value={project.progress}
                    text={`${project.progress}%`}
                  />
                </Box>
                <IconButton onClick={() => handleEdit(project)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(project.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={project.name}
              secondary={`Progress: ${project.currentProgress}/${project.dailyGoal} | Weekly: ${project.weeklyGoal}`}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          {editingProject && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Project Name"
                value={editingProject.name}
                onChange={(e) => setEditingProject({...editingProject, name: e.target.value})}
                fullWidth
              />
              <TextField
                label="Daily Goal"
                type="number"
                value={editingProject.dailyGoal}
                onChange={(e) => setEditingProject({...editingProject, dailyGoal: Number(e.target.value)})}
                fullWidth
              />
              <TextField
                label="Weekly Goal"
                type="number"
                value={editingProject.weeklyGoal}
                onChange={(e) => setEditingProject({...editingProject, weeklyGoal: Number(e.target.value)})}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectList; 