'use client';

import React, { useState } from 'react';
import { Container, Stack, Typography, Box, Tabs, Tab, Button } from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import { NotesList } from '@/features/notes/ui/notes-list';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { useAppSelector } from '@/store/hooks';
import { hasPermission } from '@/shared/config/permissions';
import { UploadNotes } from '@/features/notes/ui/upload-notes';

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadOpen, setUploadOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const canUpload = hasPermission(user.role, 'canUploadNotes');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

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
              <Typography variant="h3" fontWeight="900" sx={{ mb: 1 }}>Study Materials</Typography>
              <Typography variant="h6" color="text.secondary">Access your class notes and daily practice problems.</Typography>
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
                Upload Notes
              </Button>
            )}
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="study materials tabs"
              TabIndicatorProps={{
                style: {
                  height: 4,
                  borderRadius: '4px 4px 0 0',
                  backgroundColor: '#1CB068'
                }
              }}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '1rem',
                  minHeight: 64,
                  gap: 1.5,
                  color: '#64748B',
                  transition: 'all 0.2s',
                  px: { xs: 2, md: 4 },
                  '&.Mui-selected': {
                    color: '#1CB068',
                  },
                  '&:hover': {
                    color: '#1CB068',
                    bgcolor: 'rgba(28, 176, 104, 0.04)'
                  }
                },
              }}
            >
              <Tab icon={<AssignmentIcon />} iconPosition="start" label="DPP (Daily Practice Problems)" />
              <Tab icon={<DescriptionRoundedIcon />} iconPosition="start" label="Class Notes" />
            </Tabs>
          </Box>

          <Box role="tabpanel">
            {activeTab === 0 && (
              <Box>
                <Typography variant="h5" fontWeight="800" sx={{ mb: 3 }}>Daily Practice Problems</Typography>
                <NotesList type="dpp" />
              </Box>
            )}
            {activeTab === 1 && (
              <Box>
                <Typography variant="h5" fontWeight="800" sx={{ mb: 3 }}>Class Notes</Typography>
                <NotesList type="notes" />
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
      <UploadNotes open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </PageContainer>
  );
}
