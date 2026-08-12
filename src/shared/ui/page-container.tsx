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
  Divider,
  Grid
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
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
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
    { label: 'Courses', icon: <SchoolRoundedIcon />, href: '/courses' },
  ];

  const drawerWidth = 280;

  const sidebarContent = (
    <>
      {/* Dynamic Spacer: Banner (40px) + AppBar (72px) on Desktop */}
      <Box sx={{
        display: { xs: 'none', lg: 'block' },
        height: showBanner ? '112px' : '72px',
        transition: 'height 0.3s ease'
      }} />
      {/* Spacer removed as we use the dynamic Box above */}

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      {/* Sticky Header Wrapper */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1300 }}>


        {/* Main Navbar */}
        <AppBar
          position="static"
          elevation={0}
          className={`${styles.appBar} ${trigger ? styles.appBarScrolled : ''}`}
          sx={{
            width: '100%',
          }}
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
                {[
                  { name: 'PYQ Vault', href: '/' },
                  { name: 'Test Series', href: '/test-series' },
                  { name: 'Dashboard', href: '/dashboard' },
                ].map((item) => (
                  <Button
                    key={item.name}
                    href={item.href}
                    component={Link}
                    className={styles.navButton}
                  >
                    {item.name}
                  </Button>
                ))}
              </Stack>

              {/* Profile & Buttons */}
              <Stack direction="row" spacing={{ xs: 0.5, md: 2 }} alignItems="center">
                <IconButton size="small" sx={{ display: { xs: 'none', md: 'inline-flex' }, color: '#475569' }}>
                  <LanguageIcon sx={{ fontSize: 20 }} />
                  <KeyboardArrowDownIcon sx={{ fontSize: 14 }} />
                </IconButton>

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
                  {user.name ? user.name[0].toUpperCase() : 'U'}
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
                      {user.name || 'Guest User'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user.role ? user.role.toUpperCase() : 'GUEST'} • Student
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
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
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
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: drawerWidth,
                  border: 'none',
                  borderRight: '1px solid #F1F5F9',
                },
              }}
              open
            >
              {sidebarContent}
            </Drawer>
          </Box>
        )}

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Page Content */}
          <Box className={styles.pageContent}>
            {children}
          </Box>

          {/* Footer */}
          <Box sx={{ bgcolor: '#0A0F1D', color: '#94A3B8', pt: 8, pb: 4, borderTop: '1px solid #1E293B' }}>
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justify: 'space-between',
                  gap: 4,
                  mb: 6,
                }}
              >
                <Box sx={{ flex: 1.5 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Box sx={{ bgcolor: '#1CB068', color: 'white', fontWeight: 900, px: 1.5, py: 0.5, borderRadius: 2, fontSize: '1.2rem' }}>
                        E
                      </Box>
                      <Typography variant="h5" fontWeight="900" color="white">
                        EduMind
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: '#94A3B8', maxWidth: 320, lineHeight: 1.6 }}>
                      India's top platform for exam preparation. Empowering millions of students to achieve their dreams.
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="800" color="white" sx={{ mb: 2 }}>
                    Company
                  </Typography>
                  <Stack spacing={1.2}>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>About Us</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Careers</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Contact Us</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Blog</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Affiliate</Typography>
                  </Stack>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="800" color="white" sx={{ mb: 2 }}>
                    Exams
                  </Typography>
                  <Stack spacing={1.2}>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>SSC Exams</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Banking</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Railway</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Teaching</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Defense</Typography>
                  </Stack>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="800" color="white" sx={{ mb: 2 }}>
                    Products
                  </Typography>
                  <Stack spacing={1.2}>
                    <Typography variant="body2" component={Link} href="/test-series" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Test Series</Typography>
                    <Typography variant="body2" component={Link} href="/" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Previous Year Papers</Typography>
                    <Typography variant="body2" component={Link} href="#" sx={{ color: '#94A3B8', textDecoration: 'none', '&:hover': { color: 'white' } }}>Practice Questions</Typography>
                  </Stack>
                </Box>
              </Box>

              <Box sx={{ borderTop: '1px solid #1E293B', pt: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="#64748B">
                  © 2024 EduMind Education. All rights reserved.
                </Typography>

                <Stack direction="row" spacing={3}>
                  <Typography variant="body2" component={Link} href="#" sx={{ color: '#64748B', textDecoration: 'none', '&:hover': { color: 'white' } }}>Privacy Policy</Typography>
                  <Typography variant="body2" component={Link} href="#" sx={{ color: '#64748B', textDecoration: 'none', '&:hover': { color: 'white' } }}>Terms of Service</Typography>
                </Stack>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
