'use client';

import React from 'react';
import { Typography, Stack, Box, Breadcrumbs, Link as MuiLink, Container, Button, Paper } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { PageContainer } from '@/shared/ui/page-container';
import styles from './test-series.module.scss';

export default function TestGroupsPage() {
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019];

  return (
    <PageContainer>
      <Container maxWidth="xl" className={styles.pageWrapper} sx={{ py: 6 }}>
        <Stack spacing={4}>
          <Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={styles.breadcrumb}>
              <MuiLink component={Link} underline="hover" color="inherit" href="/">
                Home
              </MuiLink>
              <Typography color="text.primary" fontWeight="700">
                SSC CGL Exam Archives
              </Typography>
            </Breadcrumbs>

            <Typography variant="h3" fontWeight="900" color="#0F172A" gutterBottom>
              SSC CGL <Box component="span" sx={{ color: '#1CB068' }}>Previous Year Papers</Box> By Year
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Select an exam year to explore all shift papers for Tier 1 and Tier 2.
            </Typography>
          </Box>

          <Box className={styles.cardGrid}>
            {years.map((year) => (
              <Paper
                key={year}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#1CB068',
                    boxShadow: '0 10px 25px rgba(28,176,104,0.12)',
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <HistoryEduRoundedIcon sx={{ fontSize: 36, color: '#1CB068' }} />
                    <Typography variant="h5" fontWeight="900" color="#0F172A">
                      {year}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Official shift-wise Tier-1 & Tier-2 question paper PDFs.
                  </Typography>
                  <Button
                    component={Link}
                    href={`/test-series/ssc?year=${year}`}
                    variant="contained"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      bgcolor: '#0F172A',
                      color: 'white',
                      fontWeight: 800,
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#1CB068' },
                    }}
                  >
                    View {year} Papers
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Box>
        </Stack>
      </Container>
    </PageContainer>
  );
}
