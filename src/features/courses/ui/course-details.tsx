
'use client'
import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button, Stack, Grid, Avatar, Divider, Chip } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import { MOCK_COURSES } from '../model/mock-data';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';

interface CourseDetailsProps {
  courseId: string;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ courseId }) => {
  const [course, setCourse] = useState(() => MOCK_COURSES.find(c => c.id === courseId) || MOCK_COURSES[0]);
  const [isJoined, setIsJoined] = useState(course.isJoined || false);

  const handleJoin = () => {
    setIsJoined(true);
    // In real app, call API to join/buy
  };

  const content = [
    { type: 'video', title: 'Introduction to Calculus', duration: '15:00', locked: !isJoined },
    { type: 'note', title: 'Basic Formulas PDF', size: '1.2 MB', locked: !isJoined },
    { type: 'video', title: 'Limits and Continuity', duration: '45:00', locked: !isJoined },
    { type: 'quiz', title: 'Weekly Assessment - 1', questions: 20, locked: !isJoined },
    { type: 'video', title: 'Derivatives Masterclass', duration: '1:20:00', locked: !isJoined },
  ];

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={5}>
          {/* Header Info */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Chip
                label={course.category}
                sx={{ mb: 2, bgcolor: '#1CB06815', color: '#1CB068', fontWeight: 800 }}
              />
              <Typography variant="h3" fontWeight="900" gutterBottom>{course.title}</Typography>
              <Typography variant="h6" color="text.secondary" fontWeight="500" sx={{ mb: 3 }}>
                {course.description}
              </Typography>

              <Stack direction="row" spacing={3} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ bgcolor: '#1CB068', width: 32, height: 32 }}>{course.teacherName[0]}</Avatar>
                  <Typography fontWeight="700">{course.teacherName}</Typography>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Typography color="text.secondary" fontWeight="600">{course.studentsCount} Students Enrolled</Typography>
              </Stack>
            </Box>

            {/* Course Content List */}
            <Typography variant="h5" fontWeight="800" sx={{ mb: 3 }}>Course Curriculum</Typography>
            <Stack spacing={2}>
              {content.map((item, i) => (
                <Paper key={i} sx={{
                  p: 3,
                  borderRadius: '16px',
                  border: '1px solid #F1F5F9',
                  opacity: item.locked ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: item.locked ? 'not-allowed' : 'pointer',
                  '&:hover': { bgcolor: item.locked ? '#FFF' : '#F8FAFC' }
                }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ color: item.locked ? 'text.disabled' : '#1CB068' }}>
                      {item.type === 'video' && <PlayCircleFilledRoundedIcon />}
                      {item.type === 'note' && <DescriptionRoundedIcon />}
                      {item.type === 'quiz' && <AssignmentRoundedIcon />}
                    </Box>
                    <Box>
                      <Typography fontWeight="800" color={item.locked ? 'text.secondary' : 'text.primary'}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.type === 'video' ? item.duration : (item.type === 'note' ? item.size : `${item.questions} Questions`)}
                      </Typography>
                    </Box>
                  </Stack>
                  {item.locked && <LockRoundedIcon sx={{ color: 'text.disabled' }} />}
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* Pricing / Join Card */}
          <Grid item xs={12} md={4}>
            {!isJoined ? (
              <Paper sx={{ p: 4, borderRadius: '24px', position: 'sticky', top: 100, border: '1px solid #F1F5F9', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                <Typography variant="h4" fontWeight="900" sx={{ mb: 1 }}>₹{course.price}</Typography>
                <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>One-time payment for lifetime access</Typography>

                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleJoin}
                    sx={{ bgcolor: '#1CB068', py: 2, borderRadius: '12px', fontWeight: 900, fontSize: '1.1rem' }}
                  >
                    Enroll Now
                  </Button>
                  <Typography variant="caption" textAlign="center" color="text.secondary">
                    30-Day Money-Back Guarantee
                  </Typography>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography fontWeight="800" sx={{ mb: 2 }}>This course includes:</Typography>
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PlayCircleFilledRoundedIcon sx={{ fontSize: 18, color: '#1CB068' }} />
                    <Typography variant="body2">10+ Hours of On-demand Video</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DescriptionRoundedIcon sx={{ fontSize: 18, color: '#1CB068' }} />
                    <Typography variant="body2">25 Downloadable Resources</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AssignmentRoundedIcon sx={{ fontSize: 18, color: '#1CB068' }} />
                    <Typography variant="body2">Certification of Completion</Typography>
                  </Stack>
                </Stack>
              </Paper>
            ) : (
              <Paper sx={{ p: 4, borderRadius: '24px', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="800" gutterBottom>You're Enrolled!</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Start learning now and track your progress.
                </Typography>
                <Button variant="outlined" fullWidth color="success" sx={{ borderRadius: '12px', fontWeight: 800 }}>
                  View Rewards
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};
