'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  useScrollTrigger,
  Fab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import styles from './page-container.module.scss';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(true);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#F8FAFC' }}>
      {/* Top Banner */}
      {showBanner && (
        <Box className={styles.topBanner}>
          <Typography className={styles.bannerText}>
            🚀 Access Live Classes, Mocks, PYP & Notes for 375+ Exams!
          </Typography>
          <Button
            size="small"
            variant="contained"
            className={styles.trialButton}
          >
            Start ₹1 Trial
          </Button>
          <IconButton
            size="small"
            onClick={() => setShowBanner(false)}
            className={styles.closeBanner}
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      )}

      {/* Main Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        className={`${styles.appBar} ${trigger ? styles.appBarScrolled : ''}`}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className={styles.toolbar}>
            {/* Logo */}
            <Stack
              direction="row"
              component={Link}
              href="/"
              className={styles.logoWrapper}
            >
              <Box className={styles.logoIcon}>
                E
              </Box>
              <Typography className={styles.logoText}>
                EduMind
              </Typography>
            </Stack>

            {/* Nav Items - Desktop Only */}
            <Stack direction="row" className={styles.navItems}>
              {['Exams', 'SuperCoaching', 'Test Series', 'Books', 'Pass', 'More'].map((item) => (
                <Button
                  key={item}
                  endIcon={['Exams', 'Pass', 'More'].includes(item) ? <KeyboardArrowDownIcon /> : null}
                  className={styles.navButton}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            {/* Search & Profile */}
            <Stack direction="row" spacing={{ xs: 0.5, md: 2 }} alignItems="center">
              <Box className={styles.searchBoxDesktop}>
                <TextField
                  size="small"
                  placeholder="Search"
                  className={styles.searchInput}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#94A3B8', fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <IconButton size="small" className={styles.searchIconButton}>
                <SearchIcon sx={{ fontSize: 18 }} />
              </IconButton>

              <IconButton size="small" sx={{ display: { xs: 'none', md: 'inline-flex' }, color: '#475569' }}>
                <LanguageIcon sx={{ fontSize: 20 }} />
                <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
              </IconButton>

              <Button
                variant="contained"
                href="/test-series"
                component={Link}
                size="small"
                className={styles.getStartedButton}
              >
                Get Started
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Page Content */}
      <Box className={styles.pageContent}>
        {children}
      </Box>

      {/* Footer / Floating */}
      <Box className={styles.floatingContainer}>
        <Fab
          color="success"
          aria-label="whatsapp"
          className={styles.whatsappFab}
        >
          <WhatsAppIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
        </Fab>
      </Box>

      {/* Simple Mobile Nav Hint */}
      <Box sx={{ p: 4, textAlign: 'center', opacity: 0.3, display: { xs: 'block', md: 'none' } }}>
        <Typography variant="caption">© 2024 Testbook Education</Typography>
      </Box>
    </Box>
  );
};
