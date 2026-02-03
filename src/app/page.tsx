'use client';

import React from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  Container,
  Paper,
  alpha
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { PageContainer } from '@/shared/ui/page-container';
import styles from './home.module.scss';

export default function HomePage() {
  const stats = [
    {
      label: 'Registered Students',
      value: '6.4 Crore+',
      icon: <GroupsRoundedIcon />,
      bgColor: alpha('#1CB068', 0.1),
      color: '#1CB068'
    },
    {
      label: 'Selections',
      value: '70,000+',
      icon: <SchoolRoundedIcon />,
      bgColor: alpha('#00A3FF', 0.1),
      color: '#00A3FF'
    },
    {
      label: 'Screenshots',
      value: '5,000+',
      icon: <QuizRoundedIcon />,
      bgColor: alpha('#F59E0B', 0.1),
      color: '#F59E0B'
    },
    {
      label: 'Classes/Day',
      value: '100+',
      icon: <AssignmentRoundedIcon />,
      bgColor: alpha('#EC4899', 0.1),
      color: '#EC4899'
    }
  ];

  return (
    <PageContainer>
      {/* Hero Section */}
      <Box className={styles.heroSection}>
        <Container maxWidth="xl">
          <Box className={styles.heroContent}>
            {/* Left Content */}
            <Box className={styles.heroLeft}>
              <Stack spacing={{ xs: 3, md: 4 }}>
                <Box>
                  <Typography variant="h2" className={styles.heroTitle}>
                    One Destination for <br />
                    Complete Exam Preparation
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ mt: 2, flexWrap: 'wrap', rowGap: 1 }}>
                    {['Learn', 'Practice', 'Improve', 'Succeed'].map((text, i) => (
                      <Stack key={text} direction="row" spacing={1} alignItems="center">
                        <Typography className={styles.heroSubtext}>
                          {text}
                        </Typography>
                        {i < 3 && <Box sx={{ fontSize: '0.7rem', color: '#1CB068', opacity: 0.6 }}>▶</Box>}
                      </Stack>
                    ))}
                  </Stack>
                </Box>

                <Typography className={styles.heroDescription}>
                  Start your preparation for selections. <Box component="span" className={styles.highlightGreen}>For Free!</Box>
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    size="large"
                    href="/test-series"
                    component={Link}
                    className={styles.heroButton}
                  >
                    Get Started For Free
                  </Button>
                  <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', sm: 'flex-start' }} alignItems="center">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Google Play"
                      width={135}
                      height={40}
                      style={{ cursor: 'pointer' }}
                    />
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="App Store"
                      width={135}
                      height={40}
                      style={{ cursor: 'pointer' }}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Box>

            {/* Right Illustration */}
            <Box className={styles.heroIllustrationWrapper}>
              <Box className={styles.heroIllustration}>
                <Image
                  src="/student-hero.png"
                  alt="Study Prep"
                  width={900}
                  height={1080}
                  style={{ width: '100%', height: 'auto', borderRadius: '24px' }}
                  priority
                  quality={100}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Bar */}
      <Container maxWidth="xl" className={styles.statsWrapper}>
        <Paper elevation={0} className={styles.statsPaper}>
          <Box className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <Stack key={i} direction="row" spacing={2.5} alignItems="center">
                <Box
                  className={styles.statIconBox}
                  sx={{
                    bgcolor: stat.bgColor,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography className={styles.statLabel}>
                    {stat.label}
                  </Typography>
                  <Typography className={styles.statValue}>
                    {stat.value}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>
        </Paper>
      </Container>
    </PageContainer>
  );
}
