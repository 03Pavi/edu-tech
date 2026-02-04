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
} from '@mui/material';
import { useAppDispatch } from '@/store/hooks';
import { createBanner } from '@/store/cms/banner.actions';

export const CreateBannerModal: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    text: '',
    link: '',
    buttonText: '',
    backgroundColor: '#1CB068',
    textColor: '#ffffff',
  });

  const handleSubmit = async () => {
    if (!formData.text) {
      alert("Banner text is required");
      return;
    }

    setLoading(true);
    try {
      await dispatch(createBanner(formData)).unwrap();
      onClose();
      setFormData({
        text: '',
        link: '',
        buttonText: '',
        backgroundColor: '#1CB068',
        textColor: '#ffffff',
      });
    } catch (error) {
      console.error("Failed to create banner:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ '& .MuiDialog-paper': { borderRadius: '24px' } }}>
      <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem' }}>Create Dynamic Banner</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Banner Text"
            placeholder="e.g. 🚀 Final Sale: Get 50% off on all courses!"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Button Text (Optional)"
              value={formData.buttonText}
              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
            />
            <TextField
              fullWidth
              label="Link (Optional)"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Background Color (Hex)"
              value={formData.backgroundColor}
              onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
              type="color"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Text Color (Hex)"
              value={formData.textColor}
              onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
              type="color"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          <Box sx={{ mt: 2, p: 2, borderRadius: '12px', bgcolor: formData.backgroundColor, color: formData.textColor, textAlign: 'center' }}>
            <Typography variant="body2" fontWeight="700">Preview:</Typography>
            <Typography variant="body1" fontWeight="800">{formData.text}</Typography>
            {formData.buttonText && (
              <Button size="small" variant="contained" sx={{ mt: 1, bgcolor: 'white', color: formData.backgroundColor, fontWeight: 900, '&:hover': { bgcolor: '#f0f0f0' } }}>
                {formData.buttonText}
              </Button>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: '#64748B' }}>Cancel</Button>
        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
          sx={{ bgcolor: '#1CB068', borderRadius: '12px', px: 4, py: 1, fontWeight: 900 }}
        >
          {loading ? 'Creating...' : 'Create Banner'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
