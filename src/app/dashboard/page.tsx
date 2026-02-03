import React from 'react';
import { UserDashboard } from '@/features/dashboard/ui/user-dashboard';
import { AdminDashboard } from '@/features/dashboard/ui/admin-dashboard';
import { getSession } from '../actions';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/auth/login');
  }

  if (session.role === 'admin' || session.role === 'teacher') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
