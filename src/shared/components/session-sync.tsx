'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setUser, logout } from '@/store/slices/user-slice';
import { UserRole } from '@/store/slices/user-slice';

interface SessionSyncProps {
  session: {
    isLoggedIn: boolean;
    name?: string;
    role?: string;
  };
}

export default function SessionSync({ session }: SessionSyncProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session.isLoggedIn && session.name) {
      dispatch(setUser({
        name: session.name,
        role: session.role as UserRole
      }));
    } else {
      dispatch(logout());
    }
  }, [session, dispatch]);

  return null;
}
