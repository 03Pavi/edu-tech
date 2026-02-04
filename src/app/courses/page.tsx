
'use client'
import React from 'react';
import { Container, Box } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import { CoursesSection } from '@/features/courses/ui/courses-section';
import { useAppSelector } from '@/store/hooks';

export default function AllCoursesPage() {
  const user = useAppSelector((state) => state.user);
  const role = user.role === 'teacher' ? 'teacher' : 'student';

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <CoursesSection role={role} />
        </Box>
      </Container>
    </PageContainer>
  );
}
