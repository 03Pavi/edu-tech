'use client';

import React from 'react';
import { Typography, Stack, Box, Breadcrumbs, Link as MuiLink, Container } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { PageContainer } from '@/shared/ui/page-container';
import { GroupCard, mockGroups } from '@/features/test-series';
import styles from './test-series.module.scss';

export default function TestGroupsPage() {
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
              <MuiLink component={Link} underline="hover" color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}>
                Home
              </MuiLink>
              <Typography color="text.primary" fontWeight="700">Test Series</Typography>
            </Breadcrumbs>

            <Typography
              variant="h3"
              component="h1"
              className={styles.pageTitle}
              gutterBottom
            >
              Choose Your <Box component="span" className={styles.highlightGreen}>Exam Category</Box>
            </Typography>
            <Typography variant="body1" className={styles.pageDescription}>
              Select a specialized track to access focused mock tests and detailed performance analysis.
            </Typography>
          </Box>

          <Box className={styles.cardGrid}>
            {mockGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </Box>

          <Box className={styles.suggestBox}>
            <Typography variant="h5" className={styles.suggestTitle} gutterBottom>
              Don't see your exam?
            </Typography>
            <Typography variant="body2" className={styles.suggestText}>
              We are constantly adding new test series. Suggest a category and get notified.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </PageContainer>
  );
}
