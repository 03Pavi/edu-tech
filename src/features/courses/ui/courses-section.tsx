
'use client'
import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, InputAdornment } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { CourseCard } from './course-card';
import { Course } from '../types';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourses, enrollCourse } from '@/store/courses/course.actions';
import { CreateCourseModal } from './create-course-modal';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button } from '@mui/material';

interface CoursesSectionProps {
  role: 'student' | 'teacher';
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ role }) => {
  const dispatch = useAppDispatch();
  const { courses, isLoading } = useAppSelector((state) => state.courses);
  const currentUser = useAppSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleJoin = async (id: string) => {
    try {
      await dispatch(enrollCourse(id)).unwrap();
    } catch (error: any) {
      console.error("Enrollment failed:", error);
    }
  };

  const handleGoLive = (id: string) => {
    router.push(`/live-classes/start?courseId=${id}`);
  };

  const filteredCourses = courses.filter((c: Course) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(search.toLowerCase()));

    if (role === 'teacher') {
      // Only show courses taught by this teacher
      return matchesSearch && c.instructor?.id === currentUser.id;
    }

    return matchesSearch;
  });

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
        <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
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
          {role === 'teacher' && (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setShowCreateModal(true)}
              sx={{
                bgcolor: '#1E293B',
                borderRadius: '12px',
                px: 3,
                '&:hover': { bgcolor: '#0F172A' }
              }}
            >
              New Course
            </Button>
          )}
        </Stack>
      </Stack>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {filteredCourses.map((course: Course) => (
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
              course={course as any}
              role={role}
              onJoin={() => handleJoin(course.id.toString())}
              onGoLive={() => handleGoLive(course.id.toString())}
            />
          </Box>
        ))}
      </Box>

      {filteredCourses.length === 0 && !isLoading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">No courses found matching your search.</Typography>
        </Box>
      )}

      {isLoading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">Loading courses...</Typography>
        </Box>
      )}

      <CreateCourseModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </Box>
  );
};
