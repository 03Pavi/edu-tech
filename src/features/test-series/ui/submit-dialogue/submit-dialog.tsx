'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import styles from './submit-dialog.module.scss';

interface SubmitDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  attemptedCount: number;
  totalCount: number;
}

export const SubmitDialog: React.FC<SubmitDialogProps> = ({
  open,
  onClose,
  onConfirm,
  attemptedCount,
  totalCount,
}) => {
  return (
    <Dialog open={open} onClose={onClose} className={styles.dialog}>
      <DialogTitle className={styles.title}>Submit Test?</DialogTitle>
      <DialogContent>
        <DialogContentText className={styles.contentText}>
          You have attempted {attemptedCount} out of {totalCount} questions.
          Are you sure you want to submit the test?
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button onClick={onClose} variant="outlined" className={styles.cancelBtn}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" className={styles.submitBtn}>
          Submit Test
        </Button>
      </DialogActions>
    </Dialog>
  );
};
