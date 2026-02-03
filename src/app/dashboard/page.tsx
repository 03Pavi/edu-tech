
'use client';

import React from 'react';
import { Container, Stack, Typography, Box, Paper, Button } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import { ProfileCard } from '@/features/dashboard/ui/profile-card';
import { StatsOverview } from '@/features/dashboard/ui/stats-overview';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import Link from 'next/link';

export default function DashboardPage() {
  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    memberSince: "Jan 2024",
    targetExam: "SSC CGL 2024"
  };

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={{ xs: 3, md: 5 }}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mb: 1,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                letterSpacing: '-1.5px'
              }}
            >
              Welcome back, <Box component="span" sx={{ color: '#1CB068' }}>{mockUser.name}</Box>!
            </Typography>
            <Typography variant="h6" sx={{ color: '#64748B', fontWeight: 500, fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Track your progress and continue your preparation.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: { xs: 3, lg: 5 },
              alignItems: 'flex-start'
            }}
          >
            <Box sx={{ width: { xs: '100%', lg: '350px' }, flexShrink: 0 }}>
              <ProfileCard user={mockUser} />

              <Paper sx={{ p: 1, mt: 3, borderRadius: '24px', bgcolor: '#0F172A', color: 'white', border: 'none' }}>
                <Typography variant="h6" fontWeight="800" sx={{ mb: 2 }}>Quick Actions</Typography>
                <Stack spacing={2} >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ bgcolor: '#1CB068', borderRadius: '12px', '&:hover': { bgcolor: '#16a34a' }, textTransform: 'none', fontWeight: 800 }}
                    component={Link}
                    href="/test-series"
                  >
                    Take a Test
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', borderRadius: '12px', textTransform: 'none', fontWeight: 800 }}
                    component={Link}
                    href="/live-classes"
                    startIcon={<PlayCircleOutlineRoundedIcon />}
                  >
                    Watch Live Class
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', borderRadius: '12px', textTransform: 'none', fontWeight: 800 }}
                    component={Link}
                    href="/recorded-classes"
                    startIcon={<VideoLibraryRoundedIcon />}
                  >
                    Recorded Classes
                  </Button>
                </Stack>
              </Paper>
            </Box>

            <Stack spacing={4} sx={{ flex: 1, width: '100%', minWidth: 0 }}>
              <StatsOverview />

              <Box sx={{ width: '100%' }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>Recent Tests</Typography>
                <Paper sx={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #F1F5F9' }}>
                  {[
                    { title: "SSC CGL General Awareness", score: "42/50", date: "2 hours ago", status: "Completed" },
                    { title: "Quantitative Aptitude - Algebra", score: "35/50", date: "Yesterday", status: "Completed" },
                    { title: "English Language - Mock 12", score: "-", date: "3 days ago", status: "In Progress" },
                  ].map((test, i) => (
                    <Box
                      key={i}
                      sx={{
                        p: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: i === 2 ? 'none' : '1px solid #F1F5F9',
                        '&:hover': { bgcolor: '#F8FAFC' }
                      }}
                    >
                      <Box sx={{ minWidth: 0, flex: 1, mr: 2 }}>
                        <Typography
                          fontWeight="700"
                          sx={{
                            fontSize: { xs: '0.85rem', sm: '1rem' },
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {test.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">{test.date}</Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography fontWeight="800" color={test.score === '-' ? 'text.secondary' : '#1CB068'}>
                          {test.score}
                        </Typography>
                        <Typography variant="caption" sx={{
                          px: 1,
                          py: 0.5,
                          borderRadius: '6px',
                          fontWeight: 700,
                          bgcolor: test.status === 'Completed' ? 'rgba(28, 176, 104, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: test.status === 'Completed' ? '#1CB068' : '#F59E0B'
                        }}>
                          {test.status}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </PageContainer>
  );
}
