'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Paper,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import { PageContainer } from '@/shared/ui/page-container';
import { useAppSelector } from '@/store/hooks';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || 'user@example.com',
    targetExam: 'SSC CGL 2024',
    bio: 'Dedicated student preparing for civil services.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageContainer>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <Stack spacing={4}>
          {/* Header Section */}
          <Box>
            <Typography
              variant="h3"
              fontWeight="900"
              sx={{ mb: 1, letterSpacing: '-1.5px' }}
            >
              My Profile
            </Typography>
            <Typography color="text.secondary" fontWeight="500">
              Manage your personal information and account settings
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Left Column - Avatar & Quick Info */}
            <Box sx={{ flex: '1 1 300px' }}>
              <Paper
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #F1F5F9',
                  bgcolor: 'white',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: '#1CB068',
                      fontSize: '3rem',
                      fontWeight: 800,
                      boxShadow: '0 8px 24px rgba(28, 176, 104, 0.2)'
                    }}
                  >
                    {formData.name?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: '#1B2559',
                      color: 'white',
                      '&:hover': { bgcolor: '#1B2559ee' },
                      border: '4px solid white',
                      width: 40,
                      height: 40
                    }}
                  >
                    <CameraAltRoundedIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>

                <Typography variant="h5" fontWeight="900" sx={{ mb: 0.5 }}>
                  {formData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {user.role?.toUpperCase()} • Premium Member
                </Typography>

                <Divider sx={{ width: '100%', my: 2, borderColor: '#F1F5F9' }} />

                <Stack spacing={2} sx={{ width: '100%', textAlign: 'left' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#F8FAFC', color: '#64748B' }}>
                      <PersonOutlineRoundedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">Username</Typography>
                      <Typography variant="body2" fontWeight="700">@{formData.name.toLowerCase().replace(' ', '_')}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ p: 1, borderRadius: '10px', bgcolor: '#F8FAFC', color: '#64748B' }}>
                      <EmailOutlinedIcon fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">Email Address</Typography>
                      <Typography variant="body2" fontWeight="700">{formData.email}</Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Box>

            {/* Right Column - Edit Details */}
            <Box sx={{ flex: '1 1 500px' }}>
              <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #F1F5F9', bgcolor: 'white' }}>
                <Typography variant="h6" fontWeight="800" sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EditRoundedIcon sx={{ color: '#1CB068' }} />
                  Personal Information
                </Typography>

                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" fontWeight="800" sx={{ mb: 1, display: 'block', color: '#1B2559', ml: 1 }}>
                        FULL NAME
                      </Typography>
                      <TextField
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Enter your name"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: '#F8FAFC',
                            borderRadius: '16px',
                            '& fieldset': { borderColor: 'transparent' },
                            '&:hover fieldset': { borderColor: '#1CB06840' },
                            '&.Mui-focused fieldset': { borderColor: '#1CB068' },
                          }
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" fontWeight="800" sx={{ mb: 1, display: 'block', color: '#1B2559', ml: 1 }}>
                        EMAIL ADDRESS
                      </Typography>
                      <TextField
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        variant="outlined"
                        disabled
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            bgcolor: '#F8FAFC',
                            borderRadius: '16px',
                            '& fieldset': { borderColor: 'transparent' },
                          }
                        }}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="caption" fontWeight="800" sx={{ mb: 1, display: 'block', color: '#1B2559', ml: 1 }}>
                      BIO / DESCRIPTION
                    </Typography>
                    <TextField
                      fullWidth
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#F8FAFC',
                          borderRadius: '16px',
                          '& fieldset': { borderColor: 'transparent' },
                          '&:hover fieldset': { borderColor: '#1CB06840' },
                          '&.Mui-focused fieldset': { borderColor: '#1CB068' },
                        }
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" fontWeight="800" sx={{ mb: 1, display: 'block', color: '#1B2559', ml: 1 }}>
                      TARGET EXAM
                    </Typography>
                    <TextField
                      fullWidth
                      name="targetExam"
                      value={formData.targetExam}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: '#F8FAFC',
                          borderRadius: '16px',
                          '& fieldset': { borderColor: 'transparent' },
                          '&:hover fieldset': { borderColor: '#1CB06840' },
                          '&.Mui-focused fieldset': { borderColor: '#1CB068' },
                        }
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2, borderColor: '#F1F5F9' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                      variant="text"
                      sx={{
                        borderRadius: '14px',
                        px: 3,
                        fontWeight: 700,
                        color: '#64748B',
                        textTransform: 'none'
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#1CB068',
                        borderRadius: '14px',
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#16a34a' },
                        boxShadow: '0 8px 24px rgba(28, 176, 104, 0.2)'
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Stack>
              </Paper>

              <Paper sx={{ p: 2, mt: 3, borderRadius: '8px', border: '1px solid #FEF2F2', bgcolor: '#FFFDFD' }}>
                <Typography variant="h6" fontWeight="800" sx={{ mb: 2, color: '#EF4444', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityRoundedIcon fontSize="small" />
                  Security Settings
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Update your password and manage account security preferences.
                </Typography>
                <Button variant="outlined" color="error" sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700, borderColor: '#EF444440' }}>
                  Update Password
                </Button>
              </Paper>
            </Box>
          </Box>
        </Stack>
      </Container>
    </PageContainer>
  );
}
