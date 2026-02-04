
export interface Course {
  id: number;
  title: string;
  description: string;
  category?: string;
  price: number;
  thumbnail?: string;
  instructor?: {
    id: number;
    name: string;
    email: string;
  };
  students?: any[];
  studentsCount?: number;
  isJoined?: boolean;
  teacherName?: string;
  liveClasses?: any[];
  recordedClasses?: any[];
  notes?: any[];
  createdAt?: string;
}

export interface ClassSession {
  id: string;
  courseId: string;
  title: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'ended';
}
