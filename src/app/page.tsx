'use client';

import React from 'react';
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
                    href="/auth/login"
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

      {/* Exam Categories */}
      <Box className={styles.sectionPadding}>
        <Container maxWidth="xl">
          <Typography variant="h3" className={styles.sectionTitle} textAlign="center">
            Popular <Box component="span" className={styles.highlightGreen}>Exam Categories</Box>
          </Typography>
          <Box className={styles.categoriesGrid}>
            {[
              { label: 'SSC Exams', icon: <AccountBalanceRoundedIcon />, count: '20+ Exams' },
              { label: 'Banking', icon: <AccountBalanceRoundedIcon />, count: '15+ Exams' },
              { label: 'Teaching', icon: <SchoolRoundedIcon />, count: '12+ Exams' },
              { label: 'Defense', icon: <SecurityRoundedIcon />, count: '10+ Exams' },
              { label: 'Railways', icon: <GroupsRoundedIcon />, count: '8+ Exams' },
              { label: 'Engineering', icon: <EngineeringRoundedIcon />, count: '25+ Exams' },
              { label: 'State Exams', icon: <LibraryBooksRoundedIcon />, count: '50+ Exams' },
              { label: 'Other', icon: <LanguageRoundedIcon />, count: '100+ Exams' }
            ].map((cat, i) => (
              <Paper key={i} className={styles.categoryCard} elevation={0}>
                <Box className={styles.categoryIcon}>{cat.icon}</Box>
                <Typography className={styles.categoryLabel}>{cat.label}</Typography>
                <Typography className={styles.categoryCount}>{cat.count}</Typography>
              </Paper>
            ))}
          </Box>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button variant="outlined" size="large" className={styles.viewAllButton}>
              View All Categories
            </Button>
          </Box>
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
      <Box className={styles.referSection}>
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
      </Box>

      {/* Footer */}
      <Box component="footer" className={styles.footer}>
        <Container maxWidth="xl">
          <Box className={styles.footerGrid}>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                <Box className={styles.footerLogoIcon}>E</Box>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>EduMind</Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 300, mb: 3 }}>
                India's top platform for exam preparation. Empowring millions of students to achieve their dreams.
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton size="small" className={styles.socialIcon}><FacebookIcon /></IconButton>
                <IconButton size="small" className={styles.socialIcon}><TwitterIcon /></IconButton>
                <IconButton size="small" className={styles.socialIcon}><InstagramIcon /></IconButton>
                <IconButton size="small" className={styles.socialIcon}><LinkedInIcon /></IconButton>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" className={styles.footerHeading}>Company</Typography>
              <Stack spacing={1.5}>
                {['About Us', 'Careers', 'Contact Us', 'Blog', 'Affiliate'].map(link => (
                  <Link key={link} href="#" className={styles.footerLink}>{link}</Link>
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" className={styles.footerHeading}>Exams</Typography>
              <Stack spacing={1.5}>
                {['SSC Exams', 'Banking', 'Railway', 'Teaching', 'Defense'].map(link => (
                  <Link key={link} href="#" className={styles.footerLink}>{link}</Link>
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" className={styles.footerHeading}>Products</Typography>
              <Stack spacing={1.5}>
                {['Test Series', 'SuperCoaching', 'Previous Year Papers', 'Practice Questions', 'Live Classes'].map(link => (
                  <Link key={link} href="#" className={styles.footerLink}>{link}</Link>
                ))}
              </Stack>
            </Box>
          </Box>
          <Box className={styles.footerBottom}>
            <Typography variant="body2" color="text.secondary">
              © 2024 EduMind Education. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={3}>
              <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="#" className={styles.footerLink}>Terms of Service</Link>
            </Stack>
          </Box>
        </Container>
      </Box>
    </PageContainer>
  );
}
