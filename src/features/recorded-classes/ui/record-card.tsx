
import React from 'react';
import { Card, CardContent, Typography, Box, Stack, IconButton, Chip } from '@mui/material';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Image from 'next/image';
import styles from './recorded-classes.module.scss';

interface RecordCardProps {
  recording: {
    id: string;
    title: string;
    teacher: string;
    duration: string;
    views: string;
    thumbnail: string;
    date: string;
    category: string;
  };
}

export const RecordCard: React.FC<RecordCardProps> = ({ recording }) => {
  return (
    <Card className={styles.recordCard}>
      <Box className={styles.thumbnailWrapper}>
        <Image
          src={recording.thumbnail}
          alt={recording.title}
          layout="fill"
          objectFit="cover"
        />
        <Box className={styles.playOverlay}>
          <PlayCircleFilledRoundedIcon sx={{ fontSize: 64, color: 'white' }} />
        </Box>
        <Chip
          label={recording.category}
          size="small"
          className={styles.categoryChip}
        />
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1CB068', mb: 1 }}>
          {recording.date}
        </Typography>
        <Typography variant="h6" className={styles.recordTitle}>
          {recording.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          By {recording.teacher}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeRoundedIcon sx={{ fontSize: 16, color: '#64748B' }} />
            <Typography variant="caption" color="text.secondary">{recording.duration}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <VisibilityRoundedIcon sx={{ fontSize: 16, color: '#64748B' }} />
            <Typography variant="caption" color="text.secondary">{recording.views} views</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
