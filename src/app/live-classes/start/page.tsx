'use client';

import React, { useState } from 'react';
import { Container, Stack, Typography, Box, Paper, TextField, Button, MenuItem } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MOCK_COURSES } from '@/features/courses/model/mock-data';

export default function StartClassPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(courseId || '1');

  const handleStartClass = () => {
    setLoading(true);
    // Simulate setup
    setTimeout(() => {
      // Generate a random class ID or use a fixed one for demo
      const classId = 'maths-101-session-' + Math.floor(Math.random() * 1000);
      router.push(`/live-classes/${classId}?role=teacher`);
    }, 1500);
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
              />

              <TextField
                select
                fullWidth
                label="Select Course/Batch"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {MOCK_COURSES.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
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
              />
            </Stack>

            <Box sx={{ pt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleStartClass}
                disabled={loading}
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
