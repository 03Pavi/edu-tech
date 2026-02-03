'use client';

import React, { useEffect, useState } from 'react';
import { Typography, Paper, Stack, LinearProgress, Box } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import styles from './timer.module.scss';

const ALERT_THRESHOLD_SECONDS = 60;

interface TimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ initialMinutes, onTimeUp }) => {
  const totalSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const isAlertState = timeLeft < ALERT_THRESHOLD_SECONDS;
  const progress = (timeLeft / totalSeconds) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Paper
      elevation={0}
      className={`${styles.timerCard} ${isAlertState ? styles.alertState : ''}`}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center">
          <TimerOutlinedIcon
            className={`${styles.timerIcon} ${isAlertState ? styles.iconAlert : ''}`}
          />
          <Typography
            variant="h5"
            className={`${styles.timeText} ${isAlertState ? styles.textAlert : ''}`}
          >
            {formatTime(timeLeft)}
          </Typography>
        </Stack>
        <Box sx={{ width: '100%', mt: 0.5 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            className={`${styles.progressRoot} ${isAlertState ? styles.progressAlert : ''}`}
          />
        </Box>
      </Stack>
    </Paper>
  );
};
