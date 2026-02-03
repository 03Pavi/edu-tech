
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
import styles from '../auth.module.scss';
import Image from 'next/image';
import { login } from '../actions';

export default function LoginPage() {
  const [email, setEmail] = React.useState('user@example.com');
  const [password, setPassword] = React.useState('password123');

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
            <Box className={styles.brandWrapper} sx={{ flexDirection: 'column', gap: 1 }}>
              <Image
                src="/favicon.png"
                alt="Logo"
                width={32}
                height={32}
                style={{ borderRadius: '8px', scale: 1.2 }}
              />
            </Box>
            <Typography variant="h5" fontWeight="900" color="#1E293B">Welcome Back</Typography>
            <Typography variant="body2" color="#64748B">Please enter your details to sign in.</Typography>

            <Paper elevation={0} sx={{ mt: 2, p: 2, bgcolor: '#F1F5F9', borderRadius: '8px', border: '1px dashed #CBD5E1', textAlign: 'left' }}>
              <Typography variant="caption" color="text.secondary" display="block" fontWeight="700" sx={{ mb: 1 }}>
                Demo Credentials:
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <Box>
                  <Typography variant="caption" display="block" fontWeight="600">User:</Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>user@example.com</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" display="block" fontWeight="600">Admin:</Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>admin@example.com</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" display="block" fontWeight="600">Teacher:</Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>teacher@example.com</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" display="block" fontWeight="600">Password:</Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>password123</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          <form action={login}>
            <Box className={styles.formField}>
              <Typography className={styles.formLabel}>Email Address</Typography>
              <TextField
                fullWidth
                name="email"
                placeholder="john@example.com"
                variant="outlined"
                required
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box className={styles.formField}>
              <Typography className={styles.formLabel}>Password</Typography>
              <TextField
                fullWidth
                name="password"
                placeholder="••••••••"
                type="password"
                variant="outlined"
                required
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Hidden field to pass name for demo purposes, could be fetched from DB in real app */}
              <input type="hidden" name="name" value={email.includes('admin') ? 'Admin User' : (email.includes('teacher') ? 'Prof. Teacher' : 'John Doe')} />
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
      </Paper >
    </Box >
  );
}
