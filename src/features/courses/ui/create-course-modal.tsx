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
  InputAdornment
} from '@mui/material';
import { useAppDispatch } from '@/store/hooks';
import { createCourse } from '@/store/courses/course.actions';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';

interface CreateCourseModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    category: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title) return;
    setLoading(true);
    try {
      await dispatch(createCourse(formData)).unwrap();
      onClose();
      // Reset form
      setFormData({ title: '', description: '', price: 0, category: '' });
    } catch (error) {
      console.error('Failed to create course:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { borderRadius: '24px' } }}>
      <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem', pb: 1 }}>
        Create New Course
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
          Fill in the details below to launch your new course.
        </Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Course Title"
            placeholder="e.g. Master Class: Advanced Mathematics"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />

          <TextField
            fullWidth
            label="Category"
            placeholder="e.g. SSC, Banking, UPSC"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />

          <TextField
            fullWidth
            label="Price (₹)"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Course Description"
            placeholder="Provide a detailed overview of what students will learn..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="text" sx={{ color: '#64748B', fontWeight: 700 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading || !formData.title}
          sx={{
            bgcolor: '#1CB068',
            borderRadius: '12px',
            px: 4,
            py: 1.5,
            fontWeight: 900,
            '&:hover': { bgcolor: '#16a34a' }
          }}
        >
          {loading ? 'Creating...' : 'Launch Course'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
