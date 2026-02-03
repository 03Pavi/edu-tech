
'use client';

import React from 'react';
import { Container, Typography, Card, CardContent, Button, Stack, Box, Chip } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Link from 'next/link';
import Image from 'next/image';

export default function LiveClassesPage() {
  const classes = [
    {
      id: 'maths-101',
      title: 'Advanced Algebra & Trigonometry',
      teacher: 'Prof. Rajesh Kumar',
      time: 'Happening Now',
      students: '1.2k watching',
      image: '/exam-prep.png',
      isLive: true
    },
    {
      id: 'english-202',
      title: 'Vocabulary & Comprehension Mastery',
      teacher: 'Ms. Sneha Sharma',
      time: 'Starts in 2 hours',
      students: '450 registered',
      image: '/student-hero.png',
      isLive: false
    },
    {
      id: 'gs-303',
      title: 'Modern Indian History - Part 1',
      teacher: 'Dr. Amit Verma',
      time: 'Tomorrow, 10:00 AM',
      students: '2.1k registered',
      image: '/exam-prep.png',
      isLive: false
    }
  ];

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>
              Live <Box component="span" sx={{ color: '#1CB068' }}>Classes</Box>
            </Typography>
            <Typography color="text.secondary">
              Learn from India's top educators in real-time.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4
            }}
          >
            {classes.map((cls) => (
              <Box
                key={cls.id}
                sx={{
                  width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)' },
                  flexShrink: 0
                }}
              >
                <Card sx={{ borderRadius: '24px', overflow: 'hidden', height: '100%', border: '1px solid #F1F5F9', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <Image
                      src={cls.image}
                      alt={cls.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    {cls.isLive && (
                      <Chip
                        label="LIVE"
                        size="small"
                        sx={{ position: 'absolute', top: 16, left: 16, bgcolor: '#EF4444', color: 'white', fontWeight: 900 }}
                      />
                    )}
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography color="primary" variant="caption" fontWeight="800" gutterBottom display="block">
                      {cls.time}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, height: 60, overflow: 'hidden' }}>
                      {cls.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      By {cls.teacher}
                    </Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                      <Typography variant="caption" color="text.secondary">
                        {cls.students}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ borderRadius: '8px', bgcolor: cls.isLive ? '#1CB068' : '#64748B', textTransform: 'none', fontWeight: 700 }}
                        component={Link}
                        href={`/live-classes/${cls.id}?role=${cls.isLive ? 'student' : 'student'}`}
                        startIcon={cls.isLive ? <PlayArrowRoundedIcon /> : null}
                      >
                        {cls.isLive ? 'Watch Now' : 'Remind Me'}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          <Box sx={{ bgcolor: '#F8FAFC', p: 4, borderRadius: '24px', mt: 4 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Are you an educator?</Typography>
                <Typography color="text.secondary">Join our platform and help millions of students achieve their dreams.</Typography>
              </Box>
              <Button
                variant="outlined"
                size="large"
                sx={{ borderRadius: '12px', borderWeight: 2, fontWeight: 800 }}
                component={Link}
                href="/live-classes/start?role=teacher"
              >
                Apply as Teacher
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </PageContainer>
  );
}
