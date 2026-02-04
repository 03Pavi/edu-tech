
import { Course } from "../types";

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced Mathematics for JEE',
    description: 'Master Calculus and Algebra with expert-led sessions and practice problems.',
    teacherId: 't1',
    teacherName: 'Prof. Rajesh Kumar',
    studentsCount: 1240,
    category: 'Engineering',
    price: 499,
  },
  {
    id: '2',
    title: 'Physics Mastery: Mechanics',
    description: 'Complete guide to classical mechanics with real-world applications and visualizations.',
    teacherId: 't2',
    teacherName: 'Dr. Sarah Wilson',
    studentsCount: 850,
    category: 'Physics',
    price: 399,
  },
  {
    id: '3',
    title: 'Chemistry: Organic Compounds',
    description: 'Understand the world of organic chemistry through interactive models and active learning.',
    teacherId: 't3',
    teacherName: 'Prof. Amit Shah',
    studentsCount: 620,
    category: 'Chemistry',
    price: 299,
  }
];
