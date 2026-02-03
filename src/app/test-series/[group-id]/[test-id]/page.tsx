'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Container,
  Grid
} from '@mui/material';
import Link from 'next/link';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { PageContainer } from '@/shared/ui/page-container';
import { mockTests, mockGroups } from '@/features/test-series';
import styles from './instructions.module.scss';

export default function TestInstructionsPage() {
  const params = useParams();
  const router = useRouter();
  const testId = params['test-id'] as string;
  const groupId = params['group-id'] as string;

  const test = mockTests.find((t) => t.id === testId);
  const group = mockGroups.find((g) => g.id === groupId);

  if (!test || !group) {
    return (
      <PageContainer>
        <Container maxWidth="xl" sx={{ py: 10 }}>
          <Typography variant="h5" fontWeight="700">Test not found</Typography>
          <Button onClick={() => router.push('/test-series')} sx={{ mt: 2 }}>Back to Tests</Button>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="xl" className={styles.pageWrapper}>
        <Box className={styles.breadcrumbWrapper}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ '& .MuiBreadcrumbs-li': { fontSize: { xs: '0.75rem', md: '0.85rem' } } }}
          >
            <MuiLink component={Link} underline="hover" color="inherit" href="/">
              Home
            </MuiLink>
            <MuiLink component={Link} underline="hover" color="inherit" href="/test-series">
              Test Series
            </MuiLink>
            <MuiLink component={Link} underline="hover" color="inherit" href={`/test-series/${groupId}`}>
              {group.title}
            </MuiLink>
            <Typography color="text.primary" fontWeight="700">{test.title}</Typography>
          </Breadcrumbs>
        </Box>

        <Paper elevation={0} className={styles.mainPaper}>
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Box>
              <Typography variant="h3" className={styles.title} gutterBottom>
                {test.title}
              </Typography>

              <Box className={styles.metaGrid}>
                <Box className={styles.metaItem}>
                  <Typography variant="overline" className={styles.label}>Total Tasks</Typography>
                  <Typography variant="h5" className={styles.value}>{test.questions.length} Qs</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Box className={styles.metaItem}>
                  <Typography variant="overline" className={styles.label}>Time Limit</Typography>
                  <Typography variant="h5" className={styles.value}>{test.durationMinutes} Mins</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
                <Box className={styles.metaItem}>
                  <Typography variant="overline" className={styles.label}>Max Score</Typography>
                  <Typography variant="h5" className={styles.value}>{test.questions.length} Pts</Typography>
                </Box>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" className={styles.instructionsTitle} gutterBottom>
                Important Instructions:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                Please read the following rules carefully before starting.
              </Typography>

              <Grid container spacing={1.5}>
                {[
                  'Multiple-choice questions (MCQs).',
                  'One point per correct answer.',
                  'Use question palette for navigation.',
                  'Auto-submission on timer end.',
                  'Ensure stable environment.',
                  'Do not refresh page.',
                ].map((instruction, index) => (
                  <Grid item key={index} xs={12} sm={6}>
                    <Paper variant="outlined" className={styles.instructionCard}>
                      <CheckCircleRoundedIcon sx={{ fontSize: 18, color: '#1CB068' }} />
                      <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.75rem' }}>{instruction}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box className={styles.warningBox}>
              <InfoRoundedIcon sx={{ mt: 0.2, color: '#1CB068', fontSize: 20 }} />
              <Box>
                <Typography variant="subtitle2" fontWeight="900" color="#1CB068" sx={{ lineHeight: 1 }}>
                  Ready to Begin?
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight="600" sx={{ mt: 0.5, display: 'block' }}>
                  Once started, the timer cannot be paused. Make sure you are ready.
                </Typography>
              </Box>
            </Box>

            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 2 }}>
              <Button
                variant="text"
                onClick={() => router.push(`/test-series/${groupId}`)}
                sx={{ px: 2, py: 1, fontWeight: 800, color: 'text.secondary', textTransform: 'none' }}
              >
                Go Back
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push(`/test-series/${groupId}/${test.id}/attempt`)}
                startIcon={<PlayArrowRoundedIcon />}
                className={styles.startButton}
              >
                Start Session
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </PageContainer>
  );
}
