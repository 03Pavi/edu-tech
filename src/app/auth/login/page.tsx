
'use client';

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
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
import { useRouter } from 'next/navigation';
import styles from '../auth.module.scss';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/auth/auth.actions';
import { useState, FormEvent } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      router.push('/dashboard');
      router.refresh();
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
          </Box>

          <form onSubmit={handleSubmit}>
            {error && (
              <Box sx={{ mb: 2, p: 1, bgcolor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 1, color: '#DC2626', fontSize: '0.875rem' }}>
                {error}
              </Box>
            )}
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
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <Box className={styles.divider}>Or continue with</Box>

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
              Don't have an account?{' '}
              <Link href="/auth/signup" className={styles.linkText}>
                Create an Account
              </Link>
            </Typography>
          </Box>
        </Box >
      </Paper >

      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowNotification(false)} severity="info" sx={{ width: '100%' }}>
          This feature is currently under development. Please use email login.
        </Alert>
      </Snackbar>
    </Box >
  );
}

