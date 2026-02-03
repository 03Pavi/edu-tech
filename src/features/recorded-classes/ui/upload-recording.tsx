
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

export const UploadRecording: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
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

          <TextField fullWidth label="Recording Title" placeholder="e.g. Introduction to Calculus" />

          <TextField select fullWidth label="Select Exam Course" defaultValue="ssc">
            <MenuItem value="ssc">SSC CGL 2024</MenuItem>
            <MenuItem value="banking">IBPS PO</MenuItem>
            <MenuItem value="railways">RRB NTPC</MenuItem>
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Brief Description"
            placeholder="What will students learn in this class?"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="text" sx={{ color: '#64748B' }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ bgcolor: '#1CB068', borderRadius: '8px', px: 4 }}
        >
          Publish Recording
        </Button>
      </DialogActions>
    </Dialog>
  );
};
