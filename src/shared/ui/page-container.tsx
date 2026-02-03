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
  useScrollTrigger,
  Fab,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
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
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { logout } from '@/app/auth/actions';
import styles from './page-container.module.scss';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useAppSelector((state) => state.user);
  const pathname = usePathname();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleProfileMenuClose();
    await logout();
  };

  const toggleSidebar = (open: boolean) => () => {
    setSidebarOpen(open);
  };

  const menuItems = [
    { label: 'Home', icon: <HomeRoundedIcon />, href: '/' },
    { label: 'Dashboard', icon: <DashboardRoundedIcon />, href: '/dashboard' },
    { label: 'Test Series', icon: <AssignmentRoundedIcon />, href: '/test-series' },
    { label: 'Live Classes', icon: <LiveTvRoundedIcon />, href: '/live-classes' },
    { label: 'Recorded Classes', icon: <VideoLibraryRoundedIcon />, href: '/recorded-classes' },
  ];

  const drawerWidth = 280;

  const sidebarContent = (
    <>
      <Toolbar sx={{ display: { xs: 'none', lg: 'block' } }} />

      <Box sx={{ p: 0, pt: { xs: 2, lg: 3 } }}>
        <Box sx={{ mb: 4, display: { xs: 'flex', lg: 'none' }, alignItems: 'center', px: 1 }}>
          <Box className={styles.logoIcon} sx={{ mr: 2 }}>E</Box>
          <Typography variant="h6" fontWeight="900" color="#1B2559">EduMind</Typography>
        </Box>

        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  sx={{
                    borderRadius: '16px',
                    mb: 0.5,
                    bgcolor: isActive ? 'rgba(28, 176, 104, 0.1)' : 'transparent',
                    color: isActive ? '#1CB068' : '#64748B',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': isActive ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '25%',
                      height: '50%',
                      width: '4px',
                      bgcolor: '#1CB068',
                      borderRadius: '0 4px 4px 0',
                    } : {},
                    '&:hover': {
                      bgcolor: isActive ? 'rgba(28, 176, 104, 0.15)' : 'rgba(0, 0, 0, 0.02)',
                      color: isActive ? '#16a34a' : '#1B2559',
                    },
                    '& .MuiListItemIcon-root': {
                      color: isActive ? '#1CB068' : 'inherit',
                      minWidth: 40,
                    }
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 800 : 600,
                      fontSize: '0.9rem'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {user.role === 'user' && (
          <Box sx={{ mt: 4, p: 2, bgcolor: '#F8FAFC', borderRadius: '16px' }}>
            <Typography variant="caption" fontWeight="800" color="#64748B" display="block" gutterBottom>
              FREE PLAN
            </Typography>
            <Button variant="contained" fullWidth size="small" sx={{ bgcolor: '#1CB068', borderRadius: '8px' }}>
              Upgrade Pro
            </Button>
          </Box>
        )}
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      {/* Sidebar - Desktop Permanent / Mobile Temporary */}
      {user.isAuthenticated && (
        <Box
          component="nav"
          sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', lg: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none', boxShadow: '10px 0 30px rgba(0,0,0,0.02)' },
            }}
          >
            {sidebarContent}
          </Drawer>

          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', lg: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none', borderRight: '1px solid #F1F5F9' },
            }}
            open
          >
            {sidebarContent}
          </Drawer>
        </Box>
      )}

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
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
          sx={{ width: '100%' }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters className={styles.toolbar}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  size="small"
                  onClick={toggleSidebar(true)}
                  sx={{
                    display: { xs: 'inline-flex', lg: 'none' },
                    color: '#1B2559',
                    mr: 1,
                  }}
                >
                  <MenuIcon />
                </IconButton>

                {/* Logo */}
                <Stack
                  direction="row"
                  component={Link}
                  href="/"
                  className={styles.logoWrapper}
                >
                  <Box className={styles.logoIcon}>E</Box>
                  <Typography className={styles.logoText}>EduMind</Typography>
                </Stack>
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

              {/* Profile & Buttons */}
              <Stack direction="row" spacing={{ xs: 0.5, md: 2 }} alignItems="center">
                <IconButton size="small" sx={{ display: { xs: 'none', md: 'inline-flex' }, color: '#475569' }}>
                  <LanguageIcon sx={{ fontSize: 20 }} />
                  <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
                </IconButton>

                {!user.isAuthenticated ? (
                  <Button
                    variant="contained"
                    href="/auth/login"
                    component={Link}
                    size="small"
                    className={styles.getStartedButton}
                  >
                    Get Started
                  </Button>
                ) : (
                  <>
                    <Avatar
                      onClick={handleProfileMenuOpen}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: '#1CB068',
                        fontSize: '0.875rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                    >
                      {user.name?.[0]?.toUpperCase() || 'U'}
                    </Avatar>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleProfileMenuClose}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      PaperProps={{
                        sx: {
                          mt: 1.5,
                          width: 240,
                          borderRadius: '16px',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                          border: '1px solid #F1F5F9',
                          p: 1
                        }
                      }}
                    >
                      <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="body1" fontWeight="800" color="#1B2559">
                          {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user.role?.toUpperCase()} • Premium Member
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1, borderColor: '#F1F5F9' }} />
                      <MenuItem
                        component={Link}
                        href="/profile"
                        onClick={handleProfileMenuClose}
                        sx={{ borderRadius: '12px', mb: 0.5, fontWeight: 600, color: '#475569' }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <PersonRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          borderRadius: '12px',
                          fontWeight: 600,
                          color: '#EF4444',
                          '&:hover': { bgcolor: '#FEF2F2' }
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
                          <LogoutRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                )}
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
          <Fab color="success" aria-label="whatsapp" className={styles.whatsappFab}>
            <WhatsAppIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
          </Fab>
        </Box>

        {/* Simple Mobile Nav Hint */}
        <Box sx={{ p: 4, textAlign: 'center', opacity: 0.3, display: { xs: 'block', md: 'none' } }}>
          <Typography variant="caption">© 2024 EduMind Education</Typography>
        </Box>
      </Box>
    </Box>
  );
};
