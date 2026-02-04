'use client'
import React, { useState } from 'react';
import { Container, Stack, Typography, Box, Paper, Button, Avatar } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import { UploadRecording } from '@/features/recorded-classes/ui/upload-recording';
import { UploadNotes } from '@/features/notes/ui/upload-notes';
import { CoursesSection } from '@/features/courses/ui/courses-section';
import Link from 'next/link';

const TeacherStatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
  <Paper sx={{ p: 3, borderRadius: '24px', display: 'flex', alignItems: 'center', gap: 2, border: '1px solid #F1F5F9', height: '100%' }}>
    <Box sx={{ p: 1.5, borderRadius: '16px', bgcolor: `${color}15`, color: color, display: 'flex' }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="h5" fontWeight="900" sx={{ color: '#0F172A' }}>{value}</Typography>
      <Typography variant="body2" color="text.secondary" fontWeight="600">{title}</Typography>
    </Box>
  </Paper>
);

export const TeacherDashboard = () => {
  const [showUploadRecording, setShowUploadRecording] = useState(false);
  const [showUploadNotes, setShowUploadNotes] = useState(false);

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Stack spacing={5}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="h3" fontWeight="900" sx={{ mb: 1, letterSpacing: '-1px' }}>Teacher <Box component="span" sx={{ color: '#1CB068' }}>Panel</Box></Typography>
              <Typography variant="h6" color="text.secondary" fontWeight="500">Manage your classroom and teaching materials.</Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<VideoCallRoundedIcon />}
              component={Link}
              href="/live-classes/start"
              sx={{
                bgcolor: '#1CB068',
                borderRadius: '16px',
                px: 4,
                py: 2,
                fontWeight: 900,
                fontSize: '1rem',
                boxShadow: '0 10px 25px rgba(28, 176, 104, 0.2)',
                '&:hover': { bgcolor: '#16a34a' }
              }}
            >
              Go Live Now
            </Button>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.33% - 16px)' } }}>
              <TeacherStatCard title="Total Students" value="856" icon={<GroupsRoundedIcon />} color="#2563EB" />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.33% - 16px)' } }}>
              <TeacherStatCard title="Upcoming Classes" value="4" icon={<CalendarMonthRoundedIcon />} color="#F59E0B" />
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(33.33% - 16px)' } }}>
              <TeacherStatCard title="Classes Taken" value="128" icon={<AssignmentTurnedInRoundedIcon />} color="#1CB068" />
            </Box>
          </Box>

          {/* Content Management */}
          <Box>
            <Typography variant="h5" fontWeight="800" sx={{ mb: 3 }}>Content Management</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                <Paper
                  onClick={() => setShowUploadNotes(true)}
                  sx={{
                    p: 4,
                    borderRadius: '24px',
                    cursor: 'pointer',
                    bgcolor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.2s',
                    height: '100%',
                    '&:hover': { borderColor: '#1CB068', bgcolor: '#FFFFFF', transform: 'translateY(-4px)' }
                  }}
                >
                  <Box sx={{ p: 2, borderRadius: '16px', bgcolor: '#1CB06815', color: '#1CB068', display: 'inline-flex', mb: 2 }}>
                    <NoteAddRoundedIcon fontSize="large" />
                  </Box>
                  <Typography variant="h6" fontWeight="800">Upload Class Notes</Typography>
                  <Typography color="text.secondary" variant="body2">Share PDF, docs, or slide materials with your students.</Typography>
                </Paper>
              </Box>
              <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
                <Paper
                  onClick={() => setShowUploadRecording(true)}
                  sx={{
                    p: 4,
                    borderRadius: '24px',
                    cursor: 'pointer',
                    bgcolor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.2s',
                    height: '100%',
                    '&:hover': { borderColor: '#7C3AED', bgcolor: '#FFFFFF', transform: 'translateY(-4px)' }
                  }}
                >
                  <Box sx={{ p: 2, borderRadius: '16px', bgcolor: '#7C3AED15', color: '#7C3AED', display: 'inline-flex', mb: 2 }}>
                    <UploadFileRoundedIcon fontSize="large" />
                  </Box>
                  <Typography variant="h6" fontWeight="800">Upload Video Lecture</Typography>
                  <Typography color="text.secondary" variant="body2">Add recorded sessions for students to watch later.</Typography>
                </Paper>
              </Box>
            </Box>
          </Box>

          {/* Recent Lectures History */}
          <Box>
            <Typography variant="h5" fontWeight="800" sx={{ mb: 3 }}>Recent Lectures</Typography>
            <Paper sx={{ borderRadius: '24px', border: '1px solid #F1F5F9', overflow: 'hidden' }}>
              {[
                { title: 'Algebra Fundamentals - Part 2', date: 'Today, 2:00 PM', duration: '1h 30m', students: 245 },
                { title: 'Trigonometry Basics', date: 'Yesterday', duration: '1h 45m', students: 189 },
                { title: 'Geometry Introduction', date: '3 Feb 2024', duration: '2h 00m', students: 312 },
              ].map((lecture, i) => (
                <Box key={i} sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i === 2 ? 'none' : '1px solid #F1F5F9' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: '#F1F5F9', color: '#64748B' }}>
                      <CalendarMonthRoundedIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography fontWeight="800" sx={{ color: '#0F172A' }}>{lecture.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{lecture.date} • {lecture.duration}</Typography>
                    </Box>
                  </Stack>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography fontWeight="700" color="#1CB068">{lecture.students} Students</Typography>
                    <Typography variant="caption" color="text.secondary">Attendance</Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>

          {/* Courses Section */}
          <CoursesSection role="teacher" />
        </Stack>

        <UploadRecording open={showUploadRecording} onClose={() => setShowUploadRecording(false)} />
        <UploadNotes open={showUploadNotes} onClose={() => setShowUploadNotes(false)} />
      </Container>
    </PageContainer>
  );
};
