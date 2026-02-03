
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
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUser('John Doe'));
    router.push('/dashboard');
  };

  return (
    <Box className={styles.authPage}>
      <Paper className={styles.authCard} elevation={0}>
        {/* Left Side - Illustration */}
        <Box className={styles.authLeft}>
          <Box className={styles.illustrationBox}>
            <Image
              src="/exam-prep.png"
              alt="Student Studying"
              width={400}
              height={400}
              priority
            />
          </Box>
          <Typography variant="h4" fontWeight="800" gutterBottom>
            Exam Mastery Hub
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 300 }}>
            Unleash your academic success with our premium excellence platform.
          </Typography>

          <Box className={styles.dotsWrapper}>
            <Box className={`${styles.dot} ${styles.active}`} />
            <Box className={styles.dot} />
            <Box className={styles.dot} />
          </Box>
        </Box>

        {/* Right Side - Form */}
        <Box className={styles.authRight}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Box className={styles.brandWrapper}>
              {/* Reusing Logo logic or just text */}
              <Box className={styles.logoBox} sx={{ mx: 'auto', mb: 1 }}>E</Box>
            </Box>
            <Typography variant="h5" fontWeight="900" color="#1E293B">Welcome Back</Typography>
            <Typography variant="body2" color="#64748B">Please enter your details to sign in.</Typography>

            <Paper elevation={0} sx={{ mt: 2, p: 1.5, bgcolor: '#F1F5F9', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
              <Typography variant="caption" color="text.secondary" display="block" fontWeight="600">
                For Demo Purposes:
              </Typography>
              <Typography variant="caption" display="block" sx={{ fontFamily: 'monospace' }}>
                Email: user@example.com
              </Typography>
              <Typography variant="caption" display="block" sx={{ fontFamily: 'monospace' }}>
                Password: password123
              </Typography>
            </Paper>
          </Box>

          <form onSubmit={handleLogin}>
            <Box className={styles.formField}>
              <Typography className={styles.formLabel}>Email Address</Typography>
              <TextField
                fullWidth
                placeholder="john@example.com"
                variant="outlined"
                required
                size="small"
                defaultValue="user@example.com"
              />
            </Box>
            <Box className={styles.formField}>
              <Typography className={styles.formLabel}>Password</Typography>
              <TextField
                fullWidth
                placeholder="••••••••"
                type="password"
                variant="outlined"
                required
                size="small"
                defaultValue="password123"
              />
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link href="#" className={styles.linkText} style={{ fontSize: '0.8rem' }}>
                  Forgot Password?
                </Link>
              </Box>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              className={styles.submitButton}
            >
              Sign In
            </Button>
          </form>

          <Box className={styles.divider}>Or continue with</Box>

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
            <Typography variant="body2" color="#64748B" fontWeight="500">
              Don't have an account?{' '}
              <Link href="/auth/signup" className={styles.linkText}>
                Create an Account
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
