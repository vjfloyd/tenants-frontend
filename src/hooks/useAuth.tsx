'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSession, signOut, UserSession } from '@/api/auth';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_PATHS = ['/login', '/signup'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const session = await getSession();
      setUser(session);
      
      if (!session && !PUBLIC_PATHS.includes(pathname)) {
        router.push('/login');
      } else if (session && PUBLIC_PATHS.includes(pathname)) {
        router.push('/tenants');
      }
    } catch (error) {
      console.error('Failed to load session', error);
      setUser(null);
      if (!PUBLIC_PATHS.includes(pathname)) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout: handleLogout, refreshSession: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
