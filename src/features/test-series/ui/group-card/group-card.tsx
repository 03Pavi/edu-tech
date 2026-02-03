'use client';

import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';
import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { TestGroup } from '../../model/test-types';
import styles from './group-card.module.scss';

interface GroupCardProps {
  group: TestGroup;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Box className={styles.iconBox}>
          <FolderOpenRoundedIcon fontSize="medium" />
        </Box>

        <Typography variant="h6" component="h2" className={styles.title} gutterBottom>
          {group.title}
        </Typography>

        <Typography variant="body2" className={styles.description}>
          {group.description}
        </Typography>
      </CardContent>

      <Box className={styles.actionWrapper}>
        <Button
          component={Link}
          href={`/test-series/${group.id}`}
          variant="text"
          fullWidth
          endIcon={<ArrowForwardRoundedIcon />}
          className={styles.exploreButton}
        >
          Explore Collection
        </Button>
      </Box>
    </Card>
  );
};
