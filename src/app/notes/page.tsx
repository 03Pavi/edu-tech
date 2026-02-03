'use client';

import React from 'react';
import { Container, Stack, Typography, Box } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import { NotesList } from '@/features/notes/ui/notes-list';

export default function NotesPage() {
  return (
    <PageContainer>
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h3" fontWeight="900" sx={{ mb: 1 }}>Class Notes</Typography>
            <Typography variant="h6" color="text.secondary">Download study materials and references.</Typography>
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="800" sx={{ mb: 3 }}>Daily Practice Problems (DPP)</Typography>
            <NotesList type="dpp" />
          </Box>

          <Box>
            <Typography variant="h5" fontWeight="800" sx={{ mb: 3 }}>Lecture Notes</Typography>
            <NotesList type="notes" />
          </Box>
        </Stack>
      </Container>
    </PageContainer>
  );
}
