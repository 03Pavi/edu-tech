'use client';

import React, { useEffect } from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  Container,
  Paper,
  IconButton,
  alpha
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchExamsThunk } from '@/store/slices/pyq-slice';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TrainRoundedIcon from '@mui/icons-material/TrainRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { PageContainer } from '@/shared/ui/page-container';
import styles from './home.module.scss';

const EXAM_ICON_MAP: Record<string, React.ReactElement> = {
  'ssc-cgl': <AccountBalanceRoundedIcon />,
  'ssc-chsl': <AccountBalanceRoundedIcon />,
  'ssc-cpo': <SecurityRoundedIcon />,
  'ssc-mts': <AssignmentRoundedIcon />,
  'ssc-gd': <SecurityRoundedIcon />,
  'rrb-ntpc': <TrainRoundedIcon />,
  'ibps-po': <AccountBalanceRoundedIcon />,
  'teaching': <SchoolRoundedIcon />,
  'engineering': <EngineeringRoundedIcon />,
};

const CATEGORY_ICON_MAP: Record<string, React.ReactElement> = {
  'SSC': <AccountBalanceRoundedIcon />,
  'Railway': <TrainRoundedIcon />,
  'Banking': <AccountBalanceRoundedIcon />,
  'Defense': <SecurityRoundedIcon />,
  'Teaching': <SchoolRoundedIcon />,
  'Engineering': <EngineeringRoundedIcon />,
  'State': <LibraryBooksRoundedIcon />,
};

function getExamIcon(slug: string, category: string): React.ReactElement {
  return EXAM_ICON_MAP[slug] ?? CATEGORY_ICON_MAP[category] ?? <LanguageRoundedIcon />;
}

export default function HomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { exams, loadingExams } = useAppSelector((state) => state.pyq);

  useEffect(() => {
    dispatch(fetchExamsThunk());
  }, [dispatch]);

  const stats = [
    {
      label: 'Previous Year Papers',
      value: '1000+',
      icon: <DescriptionRoundedIcon />,
      bgColor: alpha('#1CB068', 0.1),
      color: '#1CB068',
      subtext: 'Shift-wise PDFs'
    },
    {
      label: 'Exams Covered',
      value: `${exams.length || '6'}+`,
      icon: <LibraryBooksRoundedIcon />,
      bgColor: alpha('#00A3FF', 0.1),
      color: '#00A3FF',
      subtext: 'SSC, Railway & more'
    },
    {
      label: 'AI-Powered Analysis',
      value: '100%',
      icon: <AutoAwesomeRoundedIcon />,
      bgColor: alpha('#8B5CF6', 0.1),
      color: '#8B5CF6',
      subtext: 'Smart insights'
    },
    {
      label: 'Free Access',
      value: 'Always',
      icon: <LockOpenRoundedIcon />,
      bgColor: alpha('#F59E0B', 0.1),
      color: '#F59E0B',
      subtext: 'No subscription needed'
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
                  Start your preparation for selections.{' '}
                  <Box component="span" className={styles.highlightGreen}>For Free!</Box>
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
                  <Button
                    variant="contained"
                    size="large"
                    href="/auth/login"
                    component={Link}
                    className={styles.heroButton}
                  >
                    Get Started For Free
                  </Button>
                  {/* <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', sm: 'flex-start' }} alignItems="center">
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
                  </Stack> */}
                </Stack>
              </Stack>
            </Box>

            {/* Right Illustration */}
            <Box className={styles.heroIllustrationWrapper}>
              <Box className={styles.heroIllustration}>
                <Image
                  src="/hero-woman.png"
                  alt="Study Prep"
                  width={900}
                  height={1080}
                  style={{ width: '100%', height: 'auto' }}
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
                  {'subtext' in stat && (
                    <Typography sx={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600, mt: 0.25 }}>
                      {(stat as any).subtext}
                    </Typography>
                  )}
                </Box>
              </Stack>
            ))}
          </Box>
        </Paper>
      </Container>

      {/* Popular Exam Categories — driven by live API data */}
      <Box className={styles.sectionPadding}>
        <Container maxWidth="xl">
          <Typography variant="h3" className={styles.sectionTitle} textAlign="center">
            Popular <Box component="span" className={styles.highlightGreen}>Exam Categories</Box>
          </Typography>

          {loadingExams ? (
            /* Skeleton placeholders while fetching */
            <Box className={styles.categoriesGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Paper
                  key={i}
                  className={styles.categoryCard}
                  elevation={0}
                  sx={{ opacity: 0.4, pointerEvents: 'none' }}
                >
                  <Box className={styles.categoryIcon} sx={{ bgcolor: '#E2E8F0' }} />
                  <Box sx={{ height: 16, bgcolor: '#E2E8F0', borderRadius: 1, mx: 'auto', mb: 1, width: '60%' }} />
                  <Box sx={{ height: 12, bgcolor: '#F1F5F9', borderRadius: 1, mx: 'auto', width: '40%' }} />
                </Paper>
              ))}
            </Box>
          ) : (
            <Box className={styles.categoriesGrid}>
              {exams.map((exam: any) => {
                const yearsLabel =
                  exam.years && exam.years.length > 0
                    ? `${exam.years.length} Year${exam.years.length > 1 ? 's' : ''} Available`
                    : exam.category ?? '';
                return (
                  <Paper
                    key={exam.slug}
                    className={styles.categoryCard}
                    elevation={0}
                    onClick={() => router.push(`/pyq/${exam.slug}`)}
                  >
                    <Box className={styles.categoryIcon}>
                      {getExamIcon(exam.slug, exam.category ?? '')}
                    </Box>
                    <Typography className={styles.categoryLabel}>{exam.name}</Typography>
                    <Typography className={styles.categoryCount}>{yearsLabel}</Typography>
                  </Paper>
                );
              })}
            </Box>
          )}

          {/* <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              className={styles.viewAllButton}
              onClick={() => router.push('/pyq/ssc-cgl')}
            >
              View All Categories
            </Button>
          </Box> */}
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box className={styles.whyChooseSection}>
        <Container maxWidth="xl">
          <Typography variant="h3" className={styles.sectionTitle} textAlign="center">
            Why Choose <Box component="span" className={styles.highlightGreen}>EduMind</Box>?
          </Typography>
          <Box className={styles.featuresGrid}>
            {[
              {
                title: 'Quality Content',
                desc: 'Curated by experts for the best results.',
                icon: <LibraryBooksRoundedIcon />,
                color: '#6366F1'
              },
              {
                title: 'Real Exam Experience',
                desc: 'Simulate actual exam environment.',
                icon: <EmojiEventsRoundedIcon />,
                color: '#F59E0B'
              },
              {
                title: 'Expert Analysis',
                desc: 'Deep insights into your performance.',
                icon: <TrendingUpRoundedIcon />,
                color: '#1CB068'
              },
              {
                title: 'Community Support',
                desc: 'Join 6.4 Crore+ fellow aspirants.',
                icon: <PeopleAltRoundedIcon />,
                color: '#EC4899'
              }
            ].map((feature, i) => (
              <Box key={i} className={styles.featureItem}>
                <Box className={styles.featureIcon} sx={{ color: feature.color }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">{feature.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Refer & Earn */}
      {/* <Box className={styles.referSection}> 
        <Container maxWidth="xl">
          <Box className={styles.referCard}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: 'white' }}>
                  Refer & <Box component="span" sx={{ color: '#FBDF07' }}>Earn Rewards</Box>
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
                  Invite your friends to EduMind and get exclusive benefits on your next subscription.
                </Typography>
                <Button variant="contained" className={styles.referButton}>
                  Invite Now
                </Button>
              </Box>
              <Box sx={{ flex: 0.8, display: { xs: 'none', md: 'block' } }}>
                <Image
                  src="/exam-prep.png"
                  alt="Refer and Earn"
                  width={400}
                  height={300}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box> */}

      {/* Footer */}
    </PageContainer>
  );
}
