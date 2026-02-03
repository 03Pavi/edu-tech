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

export const UploadNotes: React.FC<{ open: boolean, onClose: () => void }> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className={styles.uploadDialog}>
      <DialogTitle sx={{ fontWeight: 900, fontSize: '1.5rem' }}>Upload Class Notes</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Box className={styles.dropZone}>
            <CloudUploadRoundedIcon sx={{ fontSize: 48, color: '#94A3B8', mb: 1 }} />
            <Typography variant="body1" fontWeight="700">Drag & Drop PDF/Doc</Typography>
            <Typography variant="caption" color="text.secondary">PDF, DOCX (Max 20MB)</Typography>
          </Box>

          <TextField fullWidth label="Note Title" placeholder="e.g. Calculus Formula Sheet" />

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
            placeholder="What does this document contain?"
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
          Upload Notes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
