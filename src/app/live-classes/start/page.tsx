'use client';

import React, { useState } from 'react';
import { Container, Stack, Typography, Box, Paper, TextField, Button, MenuItem } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourses, addLiveClass } from '@/store/courses/course.actions';

export default function StartClassPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);

  const courseId = searchParams.get('courseId');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    courseId: courseId || '',
    description: '',
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour later
  });

  React.useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleStartClass = async () => {
    if (!formData.title || !formData.courseId) return;
    setLoading(true);

    try {
      const result = await dispatch(addLiveClass({
        courseId: formData.courseId,
        data: {
          title: formData.title,
          startTime: formData.startTime,
          endTime: formData.endTime,
          meetingLink: `https://meet.jit.si/${formData.courseId}-${Date.now()}`
        }
      })).unwrap();

      router.push(`/live-classes/${result.id}?role=teacher`);
    } catch (error) {
      console.error('Failed to start live class:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: '24px' }}>
          <Stack spacing={4}>
            <Box textAlign="center">
              <Box sx={{
                display: 'inline-flex',
                p: 2,
                borderRadius: '50%',
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                color: '#EF4444',
                mb: 2
              }}>
                <VideoCallRoundedIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h4" fontWeight="900" gutterBottom>Go Live</Typography>
              <Typography color="text.secondary">Set up your class details and start streaming.</Typography>
            </Box>

            <Stack spacing={3}>
              <TextField
                label="Class Title"
                fullWidth
                placeholder="e.g. Advanced Calculus - Lecture 3"
                variant="outlined"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <TextField
                select
                fullWidth
                label="Select Course/Batch"
                value={formData.courseId}
                onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
              >
                {courses.map((course: any) => (
                  <MenuItem key={course.id} value={course.id.toString()}>
                    {course.title}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                placeholder="Topics covered in this session..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Stack>

            <Box sx={{ pt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleStartClass}
                disabled={loading || !formData.title || !formData.courseId}
                sx={{
                  bgcolor: '#EF4444',
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  '&:hover': { bgcolor: '#DC2626' }
                }}
              >
                {loading ? 'Starting Studio...' : 'Start Live Session'}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </PageContainer>
  );
}
