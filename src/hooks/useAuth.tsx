'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = useCallback(async () => {
    // If we're already loading or in the middle of logging out, don't fetch session
    if (isLoggingOut) return;
    
    // Check if we just logged out in this browser session
    const justLoggedOut = typeof window !== 'undefined' && localStorage.getItem('just_logged_out') === 'true';
    
    setLoading(true);
    try {
      const session = await getSession();
      
      // If we have a session but we're on the login page after a logout, 
      // we might want to ignore it if it's stale, but getSession already has cache: 'no-store'.
      // If session exists, and we are NOT in 'just logged out' mode, proceed.
      if (session && !justLoggedOut) {
        setUser(session);
        if (PUBLIC_PATHS.includes(pathname) || pathname === '/') {
          router.push('/tenants');
        }
      } else {
        // No session or we just logged out (treat as no session)
        setUser(null);
        if (justLoggedOut) {
          localStorage.removeItem('just_logged_out');
        }
        if (!PUBLIC_PATHS.includes(pathname)) {
          router.push('/login');
        }
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
  }, [pathname, router, isLoggingOut]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLoading(true);
    try {
      // Set a flag in localStorage that we are logging out
      if (typeof window !== 'undefined') {
        localStorage.setItem('just_logged_out', 'true');
      }
      
      await signOut();
      // Clear local user state immediately
      setUser(null);
      
      // Force a full page reload to the login page.
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
      setUser(null);
      window.location.href = '/login';
    }
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
