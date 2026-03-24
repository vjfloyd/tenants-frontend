// src/api/auth.ts
const API_BASE_URL = process.env.TENANTS_API || 'http://localhost:4001';

export interface UserSession {
  id: string;
  email: string;
  name?: string;
}

/**
 * Initiates the sign-in with a third-party provider.
 * The backend should start the OAuth/OIDC flow and then redirect.
 */
export function signInWithProvider(provider: string = 'google'): void {
  // Frontend sends user to a backend auth endpoint
  // We specify we want to be redirected back to /tenants after success
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const redirectUrl = encodeURIComponent(`${currentOrigin}/tenants`);
  window.location.href = `${API_BASE_URL}/auth/${provider}?redirect_to=${redirectUrl}`;
}

/**
 * Fetches the current session/identity from the backend.
 */
export async function getSession(): Promise<UserSession | null> {
  try {
    // Add cache-busting timestamp and explicit no-cache headers
    const timestamp = Date.now();
    const response = await fetch(`${API_BASE_URL}/auth/session?t=${timestamp}`, {
      credentials: 'include',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null; // Not authenticated
      }
      throw new Error(`Failed to fetch session: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}

/**
 * Signs out the user from the application.
 */
export async function signOut(): Promise<void> {
  try {
    const timestamp = Date.now();
    const response = await fetch(`${API_BASE_URL}/auth/logout?t=${timestamp}`, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    if (!response.ok) {
      console.error(`Sign out failed with status: ${response.status}`);
    }
    // The actual redirect will be handled by the caller or a reload
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
