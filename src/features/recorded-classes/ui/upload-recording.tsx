
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
import styles from './recorded-classes.module.scss';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addRecordedClass } from '@/store/courses/course.actions';

export const UploadRecording: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    description: '',
    videoUrl: 'https://example.com/demo-video.mp4', // Mock URL for now
    duration: '1h 30m'
  });

  const handlePublish = async () => {
    if (!formData.title || !formData.courseId) return;
    setLoading(true);
    try {
      await dispatch(addRecordedClass({
        courseId: formData.courseId,
        data: {
          title: formData.title,
          description: formData.description,
          videoUrl: formData.videoUrl,
          duration: formData.duration
        }
      })).unwrap();
      onClose();
      setFormData({ title: '', courseId: '', description: '', videoUrl: 'https://example.com/demo-video.mp4', duration: '1h 30m' });
    } catch (error) {
      console.error('Failed to upload recording:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className={styles.uploadDialog}>
      <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem' }}>Upload Class Recording</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Box className={styles.dropZone}>
            <CloudUploadRoundedIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 1 }} />
            <Typography variant="body1" fontWeight="700">Drag & Drop Video</Typography>
            <Typography variant="caption" color="text.secondary">MP4, WEBM or OGG (Max 500MB)</Typography>
          </Box>

          <TextField
            fullWidth
            label="Recording Title"
            placeholder="e.g. Introduction to Calculus"
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
            placeholder="What will students learn in this class?"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="text" sx={{ color: '#64748B' }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handlePublish}
          disabled={loading || !formData.title || !formData.courseId}
          sx={{ bgcolor: '#1CB068', borderRadius: '8px', px: 4 }}
        >
          {loading ? 'Publishing...' : 'Publish Recording'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
