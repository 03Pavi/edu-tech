
'use client'
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Chip, Stack } from '@mui/material';
import { Course } from '../types';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useRouter } from 'next/navigation';

interface CourseCardProps {
  course: Course;
  role: 'student' | 'teacher';
  onJoin?: (id: string) => void;
  onGoLive?: (id: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, role, onJoin, onGoLive }) => {
  const router = useRouter();
  return (
    <Card sx={{
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid #F1F5F9',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-4px)' }
    }}>
      <Box sx={{ height: 160, bgcolor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary" fontWeight="700">Course Thumbnail</Typography>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Chip
            label={course.category}
            size="small"
            sx={{ bgcolor: '#1CB06815', color: '#1CB068', fontWeight: 700, borderRadius: '8px' }}
          />
          <Stack direction="row" spacing={0.5} alignItems="center">
            <GroupsRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary" fontWeight="600">{course.studentsCount}</Typography>
          </Stack>
        </Stack>

        <Typography variant="h6" fontWeight="800" gutterBottom sx={{ lineHeight: 1.2 }}>
          {course.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <AccountCircleRoundedIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" fontWeight="600">
            {course.teacherName}
          </Typography>
        </Stack>

        <Box sx={{ mt: 'auto' }}>
          {role === 'student' ? (
            <Button
              fullWidth
              variant={course.isJoined ? "outlined" : "contained"}
              onClick={() => {
                if (course.isJoined) {
                  router.push(`/courses/${course.id}`);
                } else if (onJoin) {
                  onJoin(course.id);
                }
              }}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                fontWeight: 900,
                bgcolor: course.isJoined ? 'transparent' : '#1CB068',
                borderColor: '#1CB068',
                color: course.isJoined ? '#1CB068' : 'white',
                '&:hover': { bgcolor: course.isJoined ? '#1CB06810' : '#16a34a' }
              }}
            >
              {course.isJoined ? 'Enter Course' : 'Join Course'}
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={() => onGoLive && onGoLive(course.id)}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                fontWeight: 900,
                bgcolor: '#1CB068',
                '&:hover': { bgcolor: '#16a34a' }
              }}
            >
              Take a Class
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
