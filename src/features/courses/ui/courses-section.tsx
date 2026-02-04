
'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, InputAdornment } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { CourseCard } from './course-card';
import { MOCK_COURSES } from '../model/mock-data';
import { Course } from '../types';
import { useRouter } from 'next/navigation';

interface CoursesSectionProps {
  role: 'student' | 'teacher';
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ role }) => {
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleJoin = (id: string) => {
    setCourses(prev => prev.map(c =>
      c.id === id ? { ...c, isJoined: true } : c
    ));
    // In a real app, this would route to course details or join API
  };

  const handleGoLive = (id: string) => {
    router.push(`/live-classes/start?courseId=${id}`);
  };

  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" gutterBottom>
            {role === 'teacher' ? 'Your Courses' : 'Explore Courses'}
          </Typography>
          <Typography variant="body1" color="text.secondary" fontWeight="500">
            {role === 'teacher' ? 'Manage your teaching sessions and content.' : 'Pick a course and start your learning journey today.'}
          </Typography>
        </Box>
        <TextField
          placeholder="Search courses..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: { xs: '100%', sm: 300 },
            '& .MuiOutlinedInput-root': { borderRadius: '12px' }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {filteredCourses.map((course) => (
          <Box
            key={course.id}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 12px)',
                md: '1 1 calc(33.333% - 16px)'
              }
            }}
          >
            <CourseCard
              course={course}
              role={role}
              onJoin={handleJoin}
              onGoLive={handleGoLive}
            />
          </Box>
        ))}
      </Box>

      {filteredCourses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">No courses found matching your search.</Typography>
        </Box>
      )}
    </Box>
  );
};
