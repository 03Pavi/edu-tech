'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setUser, clearUser } from '@/store/auth/auth.slice';
import { UserRole } from '@/app/api/domain/auth/user-role.enum';

interface SessionSyncProps {
  session: {
    isLoggedIn: boolean;
    id?: number;
    name?: string;
    email?: string;
    role?: string;
  };
}

export default function SessionSync({ session }: SessionSyncProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session.isLoggedIn && session.name && session.email && session.id !== undefined) {
      dispatch(setUser({
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role as UserRole
      }));
    } else {
      dispatch(clearUser());
    }
  }, [session, dispatch]);

  return null;
}
