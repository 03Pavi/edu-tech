'use client'
import React, { useState } from 'react';
import { Container, Stack, Typography, Box, Paper, Button } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { UploadRecording } from '@/features/recorded-classes/ui/upload-recording';
import { UploadNotes } from '@/features/notes/ui/upload-notes';
import Link from 'next/link';

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
  <Paper sx={{ p: 3, borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
    <Box sx={{
      p: 1.5,
      borderRadius: '16px',
      bgcolor: `${color}15`,
      color: color,
      display: 'flex'
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="h4" fontWeight="800">{value}</Typography>
      <Typography variant="body2" color="text.secondary" fontWeight="600">{title}</Typography>
    </Box>
  </Paper>
);

const ActionButton = ({ title, icon, color, onClick, href }: { title: string, icon: React.ReactNode, color: string, onClick?: () => void, href?: string }) => {
  const ButtonBase = (
    <Button
      variant="contained"
      fullWidth
      startIcon={icon}
      onClick={onClick}
      sx={{
        bgcolor: color,
        color: 'white',
        p: 2,
        borderRadius: '16px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        fontSize: '1.1rem',
        fontWeight: 700,
        boxShadow: `0 8px 20px -8px ${color}`,
        '&:hover': { bgcolor: color, filter: 'brightness(1.1)' }
      }}
    >
      {title}
    </Button>
  );

  return href ? <Link href={href} style={{ width: '100%' }}>{ButtonBase}</Link> : ButtonBase;
};

export const AdminDashboard = () => {
  const [showUploadRecording, setShowUploadRecording] = useState(false);
  const [showUploadNotes, setShowUploadNotes] = useState(false);

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4" fontWeight="900" sx={{ mb: 1 }}>Teacher & Admin Dashboard</Typography>
            <Typography color="text.secondary">Manage classes, content, and system performance.</Typography>
          </Box>

          {/* Teacher Actions Section */}
          <Box>
            <Typography variant="h6" fontWeight="800" sx={{ mb: 2 }}>Quick Actions</Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                <ActionButton
                  title="Start Live Class"
                  icon={<VideoCallRoundedIcon />}
                  color="#E11D48" // Rose
                  href="/live-classes/start"
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                <ActionButton
                  title="Upload Notes"
                  icon={<NoteAddRoundedIcon />}
                  color="#0891B2" // Cyan
                  onClick={() => setShowUploadNotes(true)}
                />
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                <ActionButton
                  title="Upload Recording"
                  icon={<UploadFileRoundedIcon />}
                  color="#7C3AED" // Violet
                  onClick={() => setShowUploadRecording(true)}
                />
              </Box>
            </Box>
          </Box>

          {/* Stats Section */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
              <StatCard
                title="Total Users"
                value="12,450"
                icon={<PeopleAltRoundedIcon fontSize="large" />}
                color="#2563EB"
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
              <StatCard
                title="Active Tests"
                value="85"
                icon={<AssignmentRoundedIcon fontSize="large" />}
                color="#1CB068"
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
              <StatCard
                title="Total Revenue"
                value="$45k"
                icon={<AttachMoneyRoundedIcon fontSize="large" />}
                color="#F59E0B"
              />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
              <StatCard
                title="Growth Rate"
                value="+24%"
                icon={<TrendingUpRoundedIcon fontSize="large" />}
                color="#8B5CF6"
              />
            </Box>
          </Box>

          {/* Activity & Status Section */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
            <Box sx={{ flex: { lg: 2, xs: 1 } }}>
              <Paper sx={{ p: 3, borderRadius: '24px', height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>Recent Activity</Typography>
                <Stack spacing={2}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1.5, '&:hover': { bgcolor: '#F8FAFC', borderRadius: '12px' } }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: i % 2 === 0 ? '#1CB068' : '#2563EB' }} />
                      <Box flex={1}>
                        <Typography fontWeight="600" fontSize="0.95rem">New user registration: User #{1000 + i}</Typography>
                        <Typography variant="caption" color="text.secondary">2 minutes ago</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>
            <Box sx={{ flex: { lg: 1, xs: 1 } }}>
              <Paper sx={{ p: 3, borderRadius: '24px', height: '100%', bgcolor: '#1E293B', color: 'white' }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>System Status</Typography>
                <Stack spacing={3}>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight="600">Server Load</Typography>
                      <Typography variant="body2">45%</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                      <Box sx={{ width: '45%', height: '100%', bgcolor: '#1CB068', borderRadius: 4 }} />
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight="600">Memory Usage</Typography>
                      <Typography variant="body2">62%</Typography>
                    </Box>
                    <Box sx={{ width: '100%', height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4 }}>
                      <Box sx={{ width: '62%', height: '100%', bgcolor: '#F59E0B', borderRadius: 4 }} />
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Stack>

        <UploadRecording open={showUploadRecording} onClose={() => setShowUploadRecording(false)} />
        <UploadNotes open={showUploadNotes} onClose={() => setShowUploadNotes(false)} />
      </Container>
    </PageContainer>
  );
};
