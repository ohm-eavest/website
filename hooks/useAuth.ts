import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser, authAPI, User } from '../utils/auth';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if the user is authenticated using JWT tokens
      if (!isAuthenticated()) {
        router.push('/login');
        return;
      }

      try {
        // Get user data from localStorage or fetch from API
        let userData = getUser();
        if (!userData) {
          // If no user data in localStorage, fetch from API
          userData = await authAPI.getProfile();
        }
        setUser(userData);
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/login');
        return;
      }

      setIsLoading(false);
    };

    checkAuthentication();
  }, [router]);

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    router.push('/login');
  };

  return { user, isLoading, logout };
}