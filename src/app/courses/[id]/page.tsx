
import React from 'react';
import { CourseDetails } from '@/features/courses/ui/course-details';

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CourseDetails courseId={id} />;
}
