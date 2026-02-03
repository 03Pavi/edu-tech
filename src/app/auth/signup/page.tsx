
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
import Image from 'next/image';
import styles from '../auth.module.scss';
import { login } from '../actions';

export default function SignupPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  return (
    <Box className={styles.authPage}>
      <Paper className={styles.authCard} elevation={0}>
        {/* Left Side - Illustration */}
        <Box className={styles.authLeft}>
          <Box className={styles.illustrationBox}>
            <Image
              src="/exam-prep.png"
              alt="Student Joining"
              width={400}
              height={400}
              priority
            />
          </Box>
          <Typography variant="h4" fontWeight="800" gutterBottom>
            Join the Community
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 300 }}>
            Start your journey to success with over 6.4 Crore+ students worldwide.
          </Typography>

          <Box className={styles.dotsWrapper}>
            <Box className={styles.dot} />
            <Box className={`${styles.dot} ${styles.active}`} />
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
            <Typography variant="h5" fontWeight="900" color="#1E293B">Create Account</Typography>
            <Typography variant="body2" color="#64748B">Fill in the details to start your journey.</Typography>
          </Box>

          <form action={login}>
            <input type="hidden" name="name" value={`${firstName} ${lastName}`} />
            <Stack>
              <Box className={styles.formField}>
                <Typography className={styles.formLabel}>Full Name</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    placeholder="First Name"
                    variant="outlined"
                    required
                    size="small"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    placeholder="Last Name"
                    variant="outlined"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Stack>
              </Box>

              <Box className={styles.formField}>
                <Typography className={styles.formLabel}>Email Address</Typography>
                <TextField
                  fullWidth
                  name="email"
                  placeholder="john@example.com"
                  type="email"
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
              </Box>
            </Stack>

            <FormControlLabel
              control={<Checkbox size="small" defaultChecked sx={{ color: '#1CB068', '&.Mui-checked': { color: '#1CB068' } }} />}
              label={
                <Typography variant="caption" color="text.secondary">
                  I agree to the <Link href="#" className={styles.linkText}>Terms of Service</Link> and <Link href="#" className={styles.linkText}>Privacy Policy</Link>
                </Typography>
              }
              sx={{ my: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              className={styles.submitButton}
            >
              Get Started
            </Button>
          </form>

          <Box className={styles.divider}>Or sign up with</Box>

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
              Already have an account?{' '}
              <Link href="/auth/login" className={styles.linkText}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
