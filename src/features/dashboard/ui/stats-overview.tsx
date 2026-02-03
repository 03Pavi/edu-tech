
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import styles from './dashboard-ui.module.scss';

export const StatsOverview: React.FC = () => {
  const stats = [
    { label: 'Completed Tests', value: '24', icon: <AssignmentTurnedInRoundedIcon />, color: '#1CB068' },
    { label: 'In Progress', value: '3', icon: <HourglassEmptyRoundedIcon />, color: '#F59E0B' },
    { label: 'Avg. Score', value: '72%', icon: <TrendingUpRoundedIcon />, color: '#3B82F6' },
    { label: 'Certificates', value: '5', icon: <WorkspacePremiumRoundedIcon />, color: '#EC4899' },
  ];

  return (
    <Box className={styles.statsContainer}>
      {stats.map((stat, i) => (
        <Paper key={i} className={styles.statPaper}>
          <Box className={styles.statIcon} sx={{ color: stat.color }}>
            {stat.icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '1.25rem', md: '1.5rem', lg: '2rem' }
              }}
            >
              {stat.value}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{ fontSize: { xs: '0.65rem', sm: '0.875rem' } }}
            >
              {stat.label}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
