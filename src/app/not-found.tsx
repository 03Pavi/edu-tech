import Link from 'next/link';
import { Box, Button, Container, Typography, Stack } from '@mui/material';

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h1" fontWeight="900" color="#1CB068">
          404
        </Typography>
        <Typography variant="h4" fontWeight="800" color="#0F172A">
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
          The question paper or page you are looking for does not exist or has been moved.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          sx={{
            bgcolor: '#1CB068',
            color: 'white',
            fontWeight: 800,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            '&:hover': { bgcolor: '#16a34a' },
          }}
        >
          Return to PYQ Vault
        </Button>
      </Stack>
    </Container>
  );
}
