
'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Container, Stack, Typography, Box, Breadcrumbs, Link as MuiLink } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { PageContainer } from '@/shared/ui/page-container';
import { LiveStream } from '@/features/live-classes/ui/live-stream';

export default function LiveClassRoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const classId = params['class-id'] as string;
  const role = (searchParams.get('role') as 'teacher' | 'student') || 'student';

  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <MuiLink component={Link} underline="hover" color="inherit" href="/dashboard">Dashboard</MuiLink>
            <MuiLink component={Link} underline="hover" color="inherit" href="/live-classes">Live Classes</MuiLink>
            <Typography color="text.primary" fontWeight="700">Live Streaming</Typography>
          </Breadcrumbs>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                {classId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {role === 'teacher' ? 'You are streaming as Teacher' : 'You are watching as Student'}
              </Typography>
            </Box>
            {role === 'teacher' && (
              <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', px: 2, py: 1, borderRadius: '8px', fontWeight: 900 }}>
                STREMAING ON
              </Box>
            )}
          </Box>

          <LiveStream role={role} classId={classId} />
        </Stack>
      </Container>
    </PageContainer>
  );
}
