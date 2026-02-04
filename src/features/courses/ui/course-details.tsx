'use client'
import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper, Button, Stack, Avatar, Divider, Chip, CircularProgress } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourseById, enrollCourse } from '@/store/courses/course.actions';
import { clearSelectedCourse } from '@/store/courses/course.slice';

interface CourseDetailsProps {
  courseId: string;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ courseId }) => {
  const dispatch = useAppDispatch();
  const { selectedCourse: course, isLoading, error } = useAppSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourseById(courseId));
    return () => {
      dispatch(clearSelectedCourse());
    };
  }, [dispatch, courseId]);

  const handleJoin = async () => {
    try {
      await dispatch(enrollCourse(courseId)).unwrap();
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#1CB068' }} />
        </Box>
      </PageContainer>
    );
  }

  if (error || !course) {
    return (
      <PageContainer>
        <Container maxWidth="xl" sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h5" color="error" fontWeight="800">
            {error || "Course not found"}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, bgcolor: '#1CB068' }}
            onClick={() => dispatch(fetchCourseById(courseId))}
          >
            Retry
          </Button>
        </Container>
      </PageContainer>
    );
  }

  const isJoined = course.isJoined || false;
  const teacherName = course.instructor?.name || course.teacherName || 'Instructor';

  // Map real curriculum data
  const displayContent = [
    ...(course.liveClasses || []).map((c: any) => ({ type: 'video', title: c.title, detail: 'Live Class', locked: !isJoined })),
    ...(course.recordedClasses || []).map((c: any) => ({ type: 'video', title: c.title, detail: 'Recorded', locked: !isJoined })),
    ...(course.notes || []).map((c: any) => ({ type: 'note', title: c.title, detail: 'Note/PDF', locked: !isJoined })),
  ];


  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 5,
          alignItems: 'flex-start'
        }}>
          {/* Main Content Column */}
          <Box sx={{ flex: { md: '1' }, width: '100%' }}>
            {/* Header Info */}
            <Box sx={{ mb: 4 }}>
              <Chip
                label={course.category || "Education"}
                sx={{ mb: 2, bgcolor: '#1CB06815', color: '#1CB068', fontWeight: 800 }}
              />
              <Typography variant="h3" fontWeight="900" gutterBottom sx={{ letterSpacing: '-1.5px' }}>
                {course.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight="500" sx={{ mb: 3 }}>
                {course.description}
              </Typography>

              <Stack direction="row" spacing={3} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ bgcolor: '#1CB068', width: 32, height: 32, fontWeight: 800 }}>
                    {teacherName[0]}
                  </Avatar>
                  <Typography fontWeight="800" color="#1B2559">{teacherName}</Typography>
                </Stack>
                <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 2, height: 20, alignSelf: 'center' }} />
                <Typography color="text.secondary" fontWeight="700">
                  {(course.studentsCount || 0)} Students Enrolled
                </Typography>
              </Stack>
            </Box>

            {/* Course Content List */}
            <Typography variant="h5" fontWeight="900" sx={{ mb: 3, letterSpacing: '-0.5px' }}>
              Course curriculum
            </Typography>
            {displayContent.length > 0 ? (
              <Stack spacing={2}>
                {displayContent.map((item, i) => (
                  <Paper key={i} sx={{
                    p: 3,
                    borderRadius: '20px',
                    border: '1px solid #F1F5F9',
                    bgcolor: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                    opacity: item.locked ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    cursor: item.locked ? 'not-allowed' : 'pointer',
                    '&:hover': {
                      bgcolor: item.locked ? '#FFF' : '#F8FAFC',
                      transform: item.locked ? 'none' : 'translateY(-2px)',
                      boxShadow: item.locked ? 'none' : '0 10px 30px rgba(0,0,0,0.05)'
                    }
                  }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{
                        color: item.locked ? '#94A3B8' : '#1CB068',
                        bgcolor: item.locked ? '#F1F5F9' : '#1CB06815',
                        p: 1.5,
                        borderRadius: '12px',
                        display: 'flex'
                      }}>
                        {item.type === 'video' && <PlayCircleFilledRoundedIcon />}
                        {item.type === 'note' && <DescriptionRoundedIcon />}
                        {item.type === 'quiz' && <AssignmentRoundedIcon />}
                      </Box>
                      <Box>
                        <Typography fontWeight="800" color={item.locked ? '#64748B' : '#1B2559'}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="#94A3B8" fontWeight="600">
                          {item.detail}
                        </Typography>
                      </Box>
                    </Stack>
                    {item.locked && <LockRoundedIcon sx={{ color: '#94A3B8' }} />}
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Paper sx={{ p: 4, borderRadius: '20px', textAlign: 'center', border: '1px dashed #E2E8F0', bgcolor: 'transparent' }}>
                <Typography color="text.secondary" fontWeight="600">
                  No content uploaded yet for this course.
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Sidebar Column (Pricing / Join Card) */}
          <Box sx={{
            width: { xs: '100%', md: '400px' },
            position: { md: 'sticky' },
            top: { md: 120 }
          }}>
            {!isJoined ? (
              <Paper sx={{
                p: 4,
                borderRadius: '32px',
                border: '1px solid #F1F5F9',
                boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
                bgcolor: '#FFFFFF'
              }}>
                <Typography variant="h3" fontWeight="900" sx={{ mb: 1, color: '#1B2559', letterSpacing: '-1px' }}>
                  ₹{course.price}
                </Typography>
                <Typography color="#64748B" variant="body2" fontWeight="600" sx={{ mb: 4 }}>
                  One-time payment for lifetime access
                </Typography>

                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleJoin}
                    disabled={isLoading}
                    sx={{
                      bgcolor: '#1CB068',
                      py: 2.2,
                      borderRadius: '16px',
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 25px rgba(28, 176, 104, 0.25)',
                      '&:hover': { bgcolor: '#16a34a' }
                    }}
                  >
                    {isLoading ? 'Enrolling...' : 'Enroll now'}
                  </Button>
                  <Typography variant="caption" textAlign="center" color="#94A3B8" fontWeight="600">
                    30-Day Money-Back Guarantee
                  </Typography>
                </Stack>

                <Divider sx={{ my: 4, borderColor: '#F1F5F9' }} />

                <Typography fontWeight="800" color="#1B2559" sx={{ mb: 2.5 }}>This course includes:</Typography>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <PlayCircleFilledRoundedIcon sx={{ fontSize: 20, color: '#1CB068' }} />
                    <Typography variant="body2" fontWeight="600" color="#475569">
                      {(course.recordedClasses?.length || 10)}+ Hours of On-demand Video
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <DescriptionRoundedIcon sx={{ fontSize: 20, color: '#1CB068' }} />
                    <Typography variant="body2" fontWeight="600" color="#475569">
                      {(course.notes?.length || 25)} Downloadable Resources
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <AssignmentRoundedIcon sx={{ fontSize: 20, color: '#1CB068' }} />
                    <Typography variant="body2" fontWeight="600" color="#475569">Certification of Completion</Typography>
                  </Stack>
                </Stack>
              </Paper>
            ) : (
              <Paper sx={{
                p: 4,
                borderRadius: '32px',
                bgcolor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                textAlign: 'center',
                boxShadow: 'none'
              }}>
                <Box sx={{
                  width: 64,
                  height: 64,
                  bgcolor: '#DCFCE7',
                  color: '#16A34A',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <PlayCircleFilledRoundedIcon sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h5" fontWeight="900" color="#1B2559" gutterBottom>You're enrolled!</Typography>
                <Typography variant="body2" color="#64748B" fontWeight="500" sx={{ mb: 4 }}>
                  Start learning now and track your progress through the curriculum.
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  color="success"
                  sx={{
                    borderRadius: '16px',
                    fontWeight: 800,
                    py: 1.5,
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 }
                  }}
                >
                  View rewards
                </Button>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};
