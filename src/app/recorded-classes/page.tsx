
'use client';

import React, { useState } from 'react';
import { Container, Typography, Box, Stack, Button, TextField, InputAdornment } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import { RecordCard } from '@/features/recorded-classes/ui/record-card';
import { UploadRecording } from '@/features/recorded-classes/ui/upload-recording';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { useAppSelector } from '@/store/hooks';
import { hasPermission } from '@/shared/config/permissions';

export default function RecordedClassesPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const canUpload = hasPermission(user.role, 'canUploadRecordedClasses');

  const mockRecordings = [
    {
      id: '1',
      title: 'Complete Quantitative Aptitude for SSC CGL',
      teacher: 'Prof. Rajesh Kumar',
      duration: '1h 45m',
      views: '12k',
      thumbnail: '/exam-prep.png',
      date: 'Uploaded 2 days ago',
      category: 'Mathematics'
    },
    {
      id: '2',
      title: 'Modern Indian History: Comprehensive Guide',
      teacher: 'Dr. Amit Verma',
      duration: '2h 10m',
      views: '8.5k',
      thumbnail: '/student-hero.png',
      date: 'Uploaded 3 days ago',
      category: 'History'
    },
    {
      id: '3',
      title: 'Grammar Mastery: Tenses & Voice',
      teacher: 'Ms. Sneha Sharma',
      duration: '1h 20m',
      views: '5.2k',
      thumbnail: '/exam-prep.png',
      date: 'Uploaded 5 days ago',
      category: 'English'
    },
    {
      id: '4',
      title: 'Current Affairs - National & International',
      teacher: 'Arun Singh',
      duration: '45m',
      views: '15k',
      thumbnail: '/student-hero.png',
      date: 'Uploaded 1 week ago',
      category: 'General Awareness'
    }
  ];

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={4}>
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2
          }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
                Recorded <Box component="span" sx={{ color: '#1CB068' }}>Classes</Box>
              </Typography>
              <Typography color="text.secondary">
                Learn at your own pace with our massive video library.
              </Typography>
            </Box>
            {canUpload && (
              <Button
                variant="contained"
                startIcon={<CloudUploadRoundedIcon />}
                onClick={() => setUploadOpen(true)}
                sx={{
                  bgcolor: '#1CB068',
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  fontWeight: 800,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Upload Class
              </Button>
            )}
          </Box>

          <TextField
            fullWidth
            placeholder="Search for subjects, teachers or courses..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94A3B8' }} />
                </InputAdornment>
              ),
              sx: { borderRadius: '16px', bgcolor: 'white' }
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 2, md: 4 }
            }}
          >
            {mockRecordings.map((rec) => (
              <Box
                key={rec.id}
                sx={{
                  width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 22px)', lg: 'calc(25% - 24px)' },
                  flexShrink: 0,
                  minWidth: 0
                }}
              >
                <RecordCard recording={rec} />
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>

      <UploadRecording open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </PageContainer>
  );
}
