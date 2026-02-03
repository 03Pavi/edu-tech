'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, IconButton, Paper, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the prompt was recently dismissed
    const dismissedAt = localStorage.getItem('pwa-prompt-dismissed-at');
    if (dismissedAt) {
      const thirtyMinutes = 30 * 60 * 1000;
      if (Date.now() - parseInt(dismissedAt) < thirtyMinutes) {
        return;
      }
    }

    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the PWA install prompt');
    } else {
      console.log('User dismissed the PWA install prompt');
      localStorage.setItem('pwa-prompt-dismissed-at', Date.now().toString());
    }

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem('pwa-prompt-dismissed-at', Date.now().toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Slide direction="up" in={isVisible} mountOnEnter unmountOnExit>
      <Paper
        elevation={6}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          borderRadius: '16px',
          width: { xs: 'calc(100% - 48px)', sm: 320 },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(28, 176, 104, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#1CB068',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 4px 12px rgba(28, 176, 104, 0.2)',
              }}
            >
              E
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="800" color="#1B2559">
                Install EduMind
              </Typography>
              <Typography variant="caption" color="#64748B">
                Fast, easy access from your home screen
              </Typography>
            </Box>
          </Box>
          <IconButton size="small" onClick={handleClose} sx={{ color: '#94a3b8' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<GetAppIcon />}
          onClick={handleInstallClick}
          sx={{
            bgcolor: '#1CB068',
            color: 'white',
            fontWeight: '800',
            textTransform: 'none',
            borderRadius: '10px',
            py: 1,
            '&:hover': {
              bgcolor: '#16a34a',
            },
          }}
        >
          Add to Home Screen
        </Button>
      </Paper>
    </Slide>
  );
};
