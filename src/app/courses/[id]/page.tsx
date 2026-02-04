
import React from 'react';
import { CourseDetails } from '@/features/courses/ui/course-details';

export default function CoursePage({ params }: { params: { id: string } }) {
  return <CourseDetails courseId={params.id} />;
}
