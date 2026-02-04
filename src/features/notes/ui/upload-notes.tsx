import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
  Typography,
  MenuItem
} from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import styles from './notes.module.scss'; // Assuming you created this or will reuse similar styles

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addNote } from '@/store/courses/course.actions';

export const UploadNotes: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    description: '',
    contentUrl: 'https://example.com/demo-note.pdf' // Mock URL
  });

  const handleUpload = async () => {
    if (!formData.title || !formData.courseId) return;
    setLoading(true);
    try {
      await dispatch(addNote({
        courseId: formData.courseId,
        data: {
          title: formData.title,
          description: formData.description,
          contentUrl: formData.contentUrl
        }
      })).unwrap();
      onClose();
      setFormData({ title: '', courseId: '', description: '', contentUrl: 'https://example.com/demo-note.pdf' });
    } catch (error) {
      console.error('Failed to upload notes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className={styles.uploadDialog}>
      <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem' }}>Upload Class Notes</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
          Share study materials with your students.
        </Typography>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Box className={styles.dropZone}>
            <CloudUploadRoundedIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 1 }} />
            <Typography variant="body1" fontWeight="700">Drag & Drop PDF/Doc</Typography>
            <Typography variant="caption" color="text.secondary">PDF, DOCX (Max 20MB)</Typography>
          </Box>

          <TextField
            fullWidth
            label="Note Title"
            placeholder="e.g. Calculus Formula Sheet"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <TextField
            select
            fullWidth
            label="Select Course"
            value={formData.courseId}
            onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
          >
            {courses.map((course: any) => (
              <MenuItem key={course.id} value={course.id.toString()}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Brief Description"
            placeholder="What does this document contain?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="text" sx={{ color: '#64748B' }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={loading || !formData.title || !formData.courseId}
          sx={{ bgcolor: '#1CB068', borderRadius: '8px', px: 4 }}
        >
          {loading ? 'Uploading...' : 'Upload Notes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
