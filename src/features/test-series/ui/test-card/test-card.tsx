'use client';

import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, Chip } from '@mui/material';
import Link from 'next/link';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Test } from '../../model/test-types';
import styles from './test-card.module.scss';

interface TestCardProps {
  test: Test;
}

export const TestCard: React.FC<TestCardProps> = ({ test }) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
          <Chip
            label="Live Test"
            className={styles.liveChip}
          />
        </Stack>

        <Typography variant="subtitle1" component="h2" className={styles.title}>
          {test.title}
        </Typography>

        <Stack direction="row" spacing={2} className={styles.metaStack}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <HelpOutlineRoundedIcon className={styles.metaIcon} />
            <Typography variant="caption" className={styles.metaText}>
              {test.questions.length} Questions
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <TimerOutlinedIcon className={styles.metaIcon} />
            <Typography variant="caption" className={styles.metaText}>
              {test.durationMinutes} Mins
            </Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Box className={styles.actionWrapper}>
        <Button
          component={Link}
          href={`/test-series/${test.groupId}/${test.id}`}
          variant="contained"
          fullWidth
          className={styles.attemptButton}
        >
          Attempt Now
        </Button>
      </Box>
    </Card>
  );
};
