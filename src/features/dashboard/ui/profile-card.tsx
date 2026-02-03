
import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, Stack, Divider, Button } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import styles from './dashboard-ui.module.scss';

interface ProfileCardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    memberSince: string;
    targetExam: string;
  };
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <Card className={styles.profileCard}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 3 }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Avatar
            src={user.avatar}
            sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, fontSize: { xs: '1.5rem', sm: '2rem' }, bgcolor: '#1CB068' }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user.email}</Typography>
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" className={styles.tag}>
                Target: {user.targetExam}
              </Typography>
            </Box>
          </Box>
          <Button
            startIcon={<EditRoundedIcon />}
            size="small"
            variant="outlined"
            sx={{ width: { xs: '100%', sm: 'auto' }, mt: { xs: 1, sm: 0 } }}
          >
            Edit
          </Button>
        </Stack>
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 1,
            textAlign: 'center'
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="800" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>12</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>Tests Taken</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="800" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>450</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>Global Rank</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="800" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>85%</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.2 }}>Accuracy</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
