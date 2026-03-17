// src/api/auth.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://178.156.219.218';

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
  window.location.href = `${API_BASE_URL}/auth/${provider}`;
}

/**
 * Fetches the current session/identity from the backend.
 */
export async function getSession(): Promise<UserSession | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/session`);

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
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });
    // Redirect to login or home after sign out
    window.location.href = '/login';
  } catch (error) {
    console.error('Error signing out:', error);
  }
}
