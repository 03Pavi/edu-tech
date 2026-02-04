
export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  thumbnail?: string;
  price?: number;
  category?: string;
  studentsCount: number;
  isJoined?: boolean;
}

export interface ClassSession {
  id: string;
  courseId: string;
  title: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'ended';
}
