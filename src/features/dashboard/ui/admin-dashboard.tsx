'use client'
import React, { useState } from 'react';
import { Container, Stack, Typography, Box, Paper, Avatar, Grid, Chip, IconButton, Button } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

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
  const [activeTab, setActiveTab] = useState('users');

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
          <Box>
            <Typography variant="h3" fontWeight="900" sx={{ mb: 1, letterSpacing: '-1.5px' }}>Platform <Box component="span" sx={{ color: '#1CB068' }}>Overview</Box></Typography>
            <Typography variant="h6" color="text.secondary" fontWeight="500">Global statistics and management center.</Typography>
          </Box>

          {/* Core Metrics */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Total Students" value="12,450" icon={<PeopleAltRoundedIcon />} color="#2563EB" subValue="+12%" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Expert Teachers" value="48" icon={<RecordVoiceOverRoundedIcon />} color="#8B5CF6" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Live Sessions" value="12" icon={<RadioButtonCheckedRoundedIcon sx={{ animation: 'pulse 1.5s infinite' }} />} color="#EF4444" subValue="Active" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard title="Lectures Done" value="856" icon={<AssignmentTurnedInRoundedIcon />} color="#1CB068" subValue="This Month" />
            </Grid>
          </Grid>

          {/* Lists Section */}
          <Grid container spacing={4}>
            {/* Teacher Management */}
            <Grid item xs={12} lg={7}>
              <Paper sx={{ p: 4, borderRadius: '32px', border: '1px solid #F1F5F9' }}>
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
            </Grid>

            {/* New Registrations */}
            <Grid item xs={12} lg={5}>
              <Paper sx={{ p: 4, borderRadius: '32px', bgcolor: '#0F172A', color: 'white' }}>
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
            </Grid>
          </Grid>

          {/* Resource Usage / Live Map Simulation */}
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
      </Container>
    </PageContainer>
  );
};
