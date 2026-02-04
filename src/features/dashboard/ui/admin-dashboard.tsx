'use client'
import React, { useState } from 'react';
import { Container, Stack, Typography, Box, Paper, Avatar, Chip, IconButton, Button } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { CreateTestSeriesModal } from '@/features/test-series/ui/create-test-series-modal';
import { CreateBannerModal } from './create-banner-modal';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAllBanners, updateBanner, deleteBanner } from '@/store/cms/banner.actions';
import { useEffect } from 'react';

const StatCard = ({ title, value, icon, color, subValue }: { title: string, value: string, icon: React.ReactNode, color: string, subValue?: string }) => (
  <Paper sx={{ p: 4, borderRadius: '24px', position: 'relative', overflow: 'hidden', height: '100%', border: '1px solid #F1F5F9' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: `${color}15`, color: color, display: 'flex' }}>
        {icon}
      </Box>
      {subValue && (
        <Chip label={subValue} size="small" sx={{ bgcolor: `${color}10`, color: color, fontWeight: 800, border: 'none' }} />
      )}
    </Box>
    <Box>
      <Typography variant="h3" fontWeight="900" sx={{ color: '#0F172A', mb: 0.5 }}>{value}</Typography>
      <Typography variant="body2" color="text.secondary" fontWeight="700" sx={{ letterSpacing: '0.5px' }}>{title}</Typography>
    </Box>
  </Paper>
);

export const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { allBanners } = useAppSelector((state) => state.banners);
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [showCreateBannerModal, setShowCreateBannerModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllBanners());
  }, [dispatch]);

  const teachers = [
    { name: 'Prof. Rajesh Kumar', subject: 'Mathematics', students: '1.2k', status: 'Active', lectures: 128 },
    { name: 'Dr. Amit Verma', subject: 'History', students: '2.1k', status: 'Live', lectures: 94 },
    { name: 'Ms. Sneha Sharma', subject: 'English', students: '850', status: 'Active', lectures: 67 },
  ];

  const users = [
    { name: 'Rahul Singh', email: 'rahul@example.com', plan: 'Pro', joining: '2 days ago' },
    { name: 'Priya Sharma', email: 'priya@example.com', plan: 'Free', joining: '3 days ago' },
    { name: 'Amit Kumar', email: 'amit@example.com', plan: 'Pro', joining: '1 week ago' },
  ];

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Stack spacing={6}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" fontWeight="900" sx={{ mb: 1, letterSpacing: '-1.5px' }}>Platform <Box component="span" sx={{ color: '#1CB068' }}>Overview</Box></Typography>
              <Typography variant="h6" color="text.secondary" fontWeight="500">Global statistics and management center.</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<CampaignRoundedIcon />}
                onClick={() => setShowCreateBannerModal(true)}
                sx={{
                  color: '#1CB068',
                  borderColor: '#1CB068',
                  borderRadius: '16px',
                  px: 3,
                  py: 1.5,
                  fontWeight: 900,
                  '&:hover': { borderColor: '#16a34a', bgcolor: 'rgba(28, 176, 104, 0.05)' }
                }}
              >
                New Banner
              </Button>
              <Button
                variant="contained"
                startIcon={<AddCircleRoundedIcon />}
                onClick={() => setShowCreateTestModal(true)}
                sx={{
                  bgcolor: '#1CB068',
                  borderRadius: '16px',
                  px: 3,
                  py: 1.5,
                  fontWeight: 900,
                  boxShadow: '0 10px 25px rgba(28, 176, 104, 0.2)',
                  '&:hover': { bgcolor: '#16a34a' }
                }}
              >
                New Mock Test
              </Button>
            </Box>
          </Box>

          {/* Core Metrics */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
              <StatCard title="Total Students" value="12,450" icon={<PeopleAltRoundedIcon />} color="#2563EB" subValue="+12%" />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
              <StatCard title="Expert Teachers" value="48" icon={<RecordVoiceOverRoundedIcon />} color="#8B5CF6" />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
              <StatCard title="Live Sessions" value="12" icon={<RadioButtonCheckedRoundedIcon sx={{ animation: 'pulse 1.5s infinite' }} />} color="#EF4444" subValue="Active" />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
              <StatCard title="Lectures Done" value="856" icon={<AssignmentTurnedInRoundedIcon />} color="#1CB068" subValue="This Month" />
            </Box>
          </Box>

          {/* Banner Management */}
          <Paper sx={{ p: 4, borderRadius: '32px', border: '1px solid #F1F5F9' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h5" fontWeight="800">Banner Management</Typography>
              <Chip label={`${allBanners.length} Total`} size="small" sx={{ fontWeight: 800 }} />
            </Box>
            {allBanners.length > 0 ? (
              <Stack spacing={2}>
                {allBanners.map((banner: any) => (
                  <Box key={banner.id} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderRadius: '20px',
                    bgcolor: '#F8FAFC',
                    border: '1px solid #E2E8F0'
                  }}>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      bgcolor: banner.backgroundColor || '#eee',
                      border: '1px solid #ddd'
                    }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight="800" variant="body2">{banner.text}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {banner.link ? `Link: ${banner.link}` : 'No link'}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={banner.isActive ? "Active" : "Inactive"}
                        size="small"
                        onClick={() => dispatch(updateBanner({ id: banner.id, data: { isActive: !banner.isActive } }))}
                        sx={{
                          cursor: 'pointer',
                          fontWeight: 800,
                          bgcolor: banner.isActive ? '#1CB06815' : '#F1F5F9',
                          color: banner.isActive ? '#1CB068' : '#64748B',
                        }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          if (window.confirm('Delete this banner?')) {
                            dispatch(deleteBanner(banner.id));
                          }
                        }}
                      >
                        <MoreVertRoundedIcon sx={{ transform: 'rotate(90deg)' }} fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
                <Typography variant="body2" fontWeight="600">No banners created yet.</Typography>
              </Box>
            )}
          </Paper>

          {/* Lists Section */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(58.333% - 16px)' } }}>
              <Paper sx={{ p: 4, borderRadius: '32px', border: '1px solid #F1F5F9', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Typography variant="h5" fontWeight="800">Teacher Performance</Typography>
                  <Button variant="text" sx={{ color: '#1CB068', fontWeight: 700 }}>View All</Button>
                </Box>
                <Stack spacing={3}>
                  {teachers.map((teacher, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '20px', '&:hover': { bgcolor: '#F8FAFC' } }}>
                      <Avatar sx={{ width: 48, height: 48, bgcolor: i === 1 ? '#FEF2F2' : '#F1F5F9', color: i === 1 ? '#EF4444' : '#64748B' }}>
                        {teacher.name[0]}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight="800">{teacher.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{teacher.subject} • {teacher.lectures} Lectures</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right', mr: 2 }}>
                        <Typography variant="body2" fontWeight="700">{teacher.students} Students</Typography>
                        <Chip
                          label={teacher.status}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 900,
                            bgcolor: teacher.status === 'Live' ? '#EF4444' : '#F1F5F9',
                            color: teacher.status === 'Live' ? 'white' : '#64748B'
                          }}
                        />
                      </Box>
                      <IconButton size="small"><MoreVertRoundedIcon /></IconButton>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(41.666% - 16px)' } }}>
              <Paper sx={{ p: 4, borderRadius: '32px', bgcolor: '#0F172A', color: 'white', height: '100%' }}>
                <Typography variant="h5" fontWeight="800" sx={{ mb: 4 }}>New Students</Typography>
                <Stack spacing={4}>
                  {users.map((user, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 800 }}>{user.name[0]}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography fontWeight="700">{user.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{user.email}</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          label={user.plan}
                          size="small"
                          sx={{ bgcolor: user.plan === 'Pro' ? '#1CB068' : 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 900, mb: 0.5 }}
                        />
                        <Typography variant="caption" display="block" sx={{ color: 'rgba(255,255,255,0.4)' }}>{user.joining}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
                <Button variant="contained" fullWidth sx={{ mt: 5, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '14px', py: 1.5, fontWeight: 700, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
                  View User Directory
                </Button>
              </Paper>
            </Box>
          </Box>

          <Paper sx={{ p: 4, borderRadius: '32px', border: '1px solid #F1F5F9' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="800">System Live Status</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#EF4444' }} />
                  <Typography variant="caption" fontWeight="700">Live (12)</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#1CB068' }} />
                  <Typography variant="caption" fontWeight="700">Healthy</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ height: 200, bgcolor: '#F8FAFC', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #E2E8F0' }}>
              <Typography variant="h6" color="text.secondary" fontWeight="700">Server Activity Visualization [Coming Soon]</Typography>
            </Box>
          </Paper>
        </Stack>
        <CreateTestSeriesModal open={showCreateTestModal} onClose={() => setShowCreateTestModal(false)} />
        <CreateBannerModal open={showCreateBannerModal} onClose={() => setShowCreateBannerModal(false)} />
      </Container>
    </PageContainer>
  );
};
