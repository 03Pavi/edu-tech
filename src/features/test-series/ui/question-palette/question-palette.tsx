'use client';

import React from 'react';
import { Box, Typography, Button, Paper, Stack, Divider } from '@mui/material';
import styles from './question-palette.module.scss';

interface QuestionPaletteProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  answeredQuestions: string[];
  onQuestionClick: (index: number) => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  totalQuestions,
  currentQuestionIndex,
  answeredQuestions,
  onQuestionClick,
}) => {
  return (
    <Paper className={styles.navigatorWrapper} elevation={0}>
      <Typography variant="subtitle2" className={styles.navigatorTitle}>
        Question Navigator
      </Typography>

      <Box className={styles.paletteGrid}>
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isAnswered = answeredQuestions.includes(index.toString());
          const isCurrent = currentQuestionIndex === index;

          let btnClass = styles.paletteButton;
          if (isCurrent) btnClass = `${btnClass} ${styles.btnCurrent}`;
          else if (isAnswered) btnClass = `${btnClass} ${styles.btnAnswered}`;

          return (
            <Button
              key={index}
              variant={isCurrent ? 'contained' : 'outlined'}
              onClick={() => onQuestionClick(index)}
              className={btnClass}
            >
              {index + 1}
            </Button>
          );
        })}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={1.5} className={styles.legendStack}>
        <Box className={styles.legendItem}>
          <Box className={`${styles.dot} ${styles.dotActive}`} />
          <Typography variant="caption" className={styles.legendText}>Active</Typography>
        </Box>
        <Box className={styles.legendItem}>
          <Box className={`${styles.dot} ${styles.dotAnswered}`} />
          <Typography variant="caption" className={styles.legendText}>Answered</Typography>
        </Box>
        <Box className={styles.legendItem}>
          <Box className={`${styles.dot} ${styles.dotUnvisited}`} />
          <Typography variant="caption" className={styles.legendText}>Not Visited</Typography>
        </Box>
      </Stack>
    </Paper>
  );
};
