import React from 'react';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F8FAFC', // Match the app background
        zIndex: 9999,
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="indeterminate"
            size={60}
            thickness={4}
            sx={{
              color: '#1CB068',
              strokeLinecap: 'round',
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h6"
              fontWeight="900"
              sx={{
                color: '#1CB068',
                fontSize: '1rem'
              }}
            >
              E
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h6"
          fontWeight="800"
          sx={{
            color: '#1B2559',
            letterSpacing: '-0.5px'
          }}
        >
          Loading <Box component="span" sx={{ color: '#1CB068' }}>EduMind</Box>...
        </Typography>
      </Stack>
    </Box>
  );
}
