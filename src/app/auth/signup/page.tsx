
'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/user-slice';
import styles from '../auth.module.scss';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    dispatch(setUser('New User'));
    router.push('/dashboard');
  };

  return (
    <Box className={styles.authPage}>
      <Paper className={styles.authCard} elevation={0}>
        <Box className={styles.logoBox}>E</Box>
        <Typography variant="h4" className={styles.authTitle}>
          Create Account
        </Typography>
        <Typography variant="body1" className={styles.authSubtitle}>
          Join 6.4 Crore+ students on EduMind
        </Typography>

        <form onSubmit={handleSignup}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                className={styles.formField}
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                className={styles.formField}
              />
            </Stack>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              className={styles.formField}
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              className={styles.formField}
              required
            />
          </Stack>

          <FormControlLabel
            control={<Checkbox size="small" defaultChecked sx={{ color: '#1CB068', '&.Mui-checked': { color: '#1CB068' } }} />}
            label={
              <Typography variant="caption" color="text.secondary">
                I agree to the <Link href="#" className={styles.linkText}>Terms of Service</Link> and <Link href="#" className={styles.linkText}>Privacy Policy</Link>
              </Typography>
            }
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            className={styles.submitButton}
          >
            Create Account
          </Button>
        </form>

        <Divider className={styles.divider}>Or sign up with</Divider>

        <Box className={styles.socialAuth}>
          <Button
            variant="outlined"
            className={styles.socialButton}
            startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            className={styles.socialButton}
            startIcon={<LinkedInIcon sx={{ color: '#0077B5' }} />}
          >
            LinkedIn
          </Button>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link href="/auth/login" className={styles.linkText}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
