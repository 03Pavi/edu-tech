
'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.scss';
import { registerUser, loginUser } from '@/store/auth/auth.actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Register
    const registerResult = await dispatch(registerUser({
      email,
      password,
      name: `${firstName} ${lastName}`.trim(),
      role: 'student'
    }));

    if (registerUser.fulfilled.match(registerResult)) {
      // 2. Login immediately after registration
      const loginResult = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(loginResult)) {
        router.push('/dashboard');
        router.refresh();
      }
    }
  };

  const handleSocialAuth = (provider: string) => {
    setShowNotification(true);
  };

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

          <form onSubmit={handleSubmit}>
            {error && (
              <Box sx={{ mb: 2, p: 1, bgcolor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 1, color: '#DC2626', fontSize: '0.875rem' }}>
                {error}
              </Box>
            )}
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
                    disabled={isLoading}
                  />
                  <TextField
                    fullWidth
                    placeholder="Last Name"
                    variant="outlined"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
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
                  disabled={isLoading}
                />
              </Box>

              <Box className={styles.formField}>
                <Typography className={styles.formLabel}>Password</Typography>
                <TextField
                  fullWidth
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  required
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
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
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Get Started'}
            </Button>
          </form>

          <Box className={styles.divider}>Or sign up with</Box>

          <Box className={styles.socialAuth}>
            <Button
              variant="outlined"
              className={styles.socialButton}
              startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
              onClick={() => handleSocialAuth('Google')}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              className={styles.socialButton}
              startIcon={<LinkedInIcon sx={{ color: '#0077B5' }} />}
              onClick={() => handleSocialAuth('LinkedIn')}
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

      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowNotification(false)} severity="info" sx={{ width: '100%' }}>
          This feature is currently under development. Please use email registration.
        </Alert>
      </Snackbar>
    </Box>
  );
}
