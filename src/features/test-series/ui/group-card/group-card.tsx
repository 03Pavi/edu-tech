'use client';

import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Box, Chip } from '@mui/material';
import Link from 'next/link';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { TestGroup } from '../../model/test-types';
import styles from './group-card.module.scss';

interface GroupCardProps {
  group: TestGroup;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const isPending = group.status === 'pending';

  return (
    <Card className={`${styles.card} ${isPending ? styles.cardPending : ''}`}>
      <CardContent className={styles.cardContent}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box className={styles.iconBox}>
            <FolderOpenRoundedIcon fontSize="medium" />
          </Box>
          {isPending && (
            <Chip
              label={group.badge || 'Coming Soon'}
              size="small"
              className={styles.comingSoonChip}
            />
          )}
        </Stack>

        <Typography variant="h6" component="h2" className={styles.title} gutterBottom>
          {group.title}
        </Typography>

        <Typography variant="body2" className={styles.description}>
          {group.description}
        </Typography>
      </CardContent>

      <Box className={styles.actionWrapper}>
        {isPending ? (
          <Button
            variant="text"
            fullWidth
            disabled
            className={styles.disabledButton}
          >
            Coming Soon
          </Button>
        ) : (
          <Button
            component={Link}
            href={`/test-series/${group.id}`}
            variant="text"
            fullWidth
            endIcon={<ArrowForwardRoundedIcon />}
            className={styles.exploreButton}
          >
            Explore SSC PYQ
          </Button>
        )}
      </Box>
    </Card>
  );
};
