'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Stack, Box, Breadcrumbs, Link as MuiLink, Button, Container, Paper } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { PageContainer } from '@/shared/ui/page-container';
import { TestCard, mockTests, mockGroups } from '@/features/test-series';
import styles from './group-tests.module.scss';

export default function TestsInGroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params['group-id'] as string;

  const group = mockGroups.find((g) => g.id === groupId);
  const tests = mockTests.filter((t) => t.groupId === groupId);

  if (!group) {
    return (
      <PageContainer>
        <Container maxWidth="xl" sx={{ py: 10 }}>
          <Stack alignItems="center" spacing={3}>
            <Typography variant="h4" fontWeight="800">Category Not Found</Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/test-series')}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ bgcolor: '#1CB068', '&:hover': { bgcolor: '#16a34a' } }}
            >
              Back to Categories
            </Button>
          </Stack>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="xl" className={styles.pageWrapper}>
        <Stack spacing={{ xs: 3, md: 6 }}>
          <Box>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              className={styles.breadcrumb}
            >
              <MuiLink component={Link} underline="hover" color="inherit" href="/">
                Home
              </MuiLink>
              <MuiLink component={Link} underline="hover" color="inherit" href="/test-series">
                Test Series
              </MuiLink>
              <Typography color="text.primary" fontWeight="700">{group.title}</Typography>
            </Breadcrumbs>

            <Box className={styles.headerRow}>
              <Box>
                <Typography
                  variant="h3"
                  component="h1"
                  className={styles.groupTitle}
                  gutterBottom
                >
                  {group.title}
                </Typography>
                <Typography variant="body1" className={styles.groupDescription}>
                  {group.description}
                </Typography>
              </Box>

              <Box className={styles.badge}>
                {tests.length} Practice Tests Available
              </Box>
            </Box>
          </Box>

          {tests.length > 0 ? (
            <Box className={styles.testGrid}>
              {tests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </Box>
          ) : (
            <Paper className={styles.emptyState} elevation={0}>
              <Typography variant="h6" color="text.secondary" fontWeight="600">No tests available in this category yet.</Typography>
            </Paper>
          )}
        </Stack>
      </Container>
    </PageContainer>
  );
}
