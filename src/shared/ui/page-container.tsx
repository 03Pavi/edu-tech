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
import MenuIcon from '@mui/icons-material/Menu';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { hasPermission } from '@/shared/config/permissions';
import styles from './page-container.module.scss';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppSelector((state) => state.user);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const toggleSidebar = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setSidebarOpen(open);
  };

  const menuItems = [
    { label: 'Home', icon: <HomeRoundedIcon />, href: '/' },
    { label: 'Dashboard', icon: <DashboardRoundedIcon />, href: '/dashboard' },
    { label: 'Test Series', icon: <AssignmentRoundedIcon />, href: '/test-series' },
    { label: 'Live Classes', icon: <LiveTvRoundedIcon />, href: '/live-classes' },
    { label: 'Recorded Classes', icon: <VideoLibraryRoundedIcon />, href: '/recorded-classes' },
  ];

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
              {['Exams', 'SuperCoaching', 'Test Series', 'Live Classes', 'Recorded', 'Dashboard', 'More'].map((item) => (
                <Button
                  key={item}
                  href={item === 'Dashboard' ? '/dashboard' : item === 'Test Series' ? '/test-series' : item === 'Live Classes' ? '/live-classes' : item === 'Recorded' ? '/recorded-classes' : '#'}
                  component={Link}
                  endIcon={['Exams', 'Pass', 'More'].includes(item) ? <KeyboardArrowDownIcon /> : null}
                  className={styles.navButton}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            {/* Profile & Menu */}
            <Stack direction="row" spacing={{ xs: 0.5, md: 2 }} alignItems="center">
              <IconButton size="small" sx={{ display: { xs: 'none', md: 'inline-flex' }, color: '#475569' }}>
                <LanguageIcon sx={{ fontSize: 20 }} />
                <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
              </IconButton>

              <IconButton
                size="small"
                onClick={toggleSidebar(true)}
                sx={{ ml: 1, color: '#1B2559' }}
              >
                <MenuIcon />
              </IconButton>

              <Button
                variant="contained"
                href="/auth/login"
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

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar(false)}
        PaperProps={{
          sx: { width: 280, p: 2, bgcolor: '#FFFFFF' }
        }}
      >
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', px: 1 }}>
          <Box className={styles.logoIcon} sx={{ mr: 2 }}>E</Box>
          <Typography variant="h6" fontWeight="900" color="#1B2559">EduMind</Typography>
        </Box>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={toggleSidebar(false)}
                sx={{
                  borderRadius: '12px',
                  '&:hover': { bgcolor: 'rgba(28, 176, 104, 0.08)' },
                  color: '#475569'
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 700, fontSize: '0.95rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {user.role === 'user' && (
          <Box sx={{ mt: 'auto', p: 2, bgcolor: '#F8FAFC', borderRadius: '16px' }}>
            <Typography variant="caption" fontWeight="800" color="#64748B" display="block" gutterBottom>
              FREE PLAN
            </Typography>
            <Button variant="contained" fullWidth size="small" sx={{ bgcolor: '#1CB068', borderRadius: '8px' }}>
              Upgrade Pro
            </Button>
          </Box>
        )}
      </Drawer>

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
