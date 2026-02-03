import React from 'react';
import { UserDashboard } from '@/features/dashboard/ui/user-dashboard';
import { AdminDashboard } from '@/features/dashboard/ui/admin-dashboard';
import { TeacherDashboard } from '@/features/dashboard/ui/teacher-dashboard';
import { getSession } from '../actions';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/auth/login');
  }

  if (session.role === 'admin') {
    return <AdminDashboard />;
  }

  if (session.role === 'teacher') {
    return <TeacherDashboard />;
  }

  return <UserDashboard />;
}
