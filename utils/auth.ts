const API_BASE_URL = 'http://localhost:8000';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'guest' | 'client' | 'sales' | 'admin';
  first_name: string;
  last_name: string;
}

export const authAPI = {
  // Login user
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.non_field_errors?.[0] || 'Login failed');
    }

    return response.json();
  },

  // Register user
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    role?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(Object.values(errorData).flat().join(', '));
    }

    return response.json();
  },

  // Get user profile
  getProfile: async () => {
    const token = getAccessToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_BASE_URL}/api/profile/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Try to refresh token
        await refreshToken();
        const newToken = getAccessToken();
        if (newToken) {
          const retryResponse = await fetch(`${API_BASE_URL}/api/profile/`, {
            headers: {
              'Authorization': `Bearer ${newToken}`,
            },
            credentials: 'include',
          });
          if (retryResponse.ok) {
            return retryResponse.json();
          }
        }
        logout();
        throw new Error('Authentication failed');
      }
      throw new Error('Failed to fetch profile');
    }

    return response.json();
  },

  // Logout user
  logout: async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await fetch(`${API_BASE_URL}/api/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ refresh: refreshToken }),
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  // Refresh access token
  refreshToken: async () => {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error('No refresh token');

    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) {
      logout();
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);
    return data;
  },
};

// Utility functions
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('refresh_token');
  }
  return null;
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const hasRole = (requiredRole: string): boolean => {
  const user = getUser();
  if (!user) return false;

  const roleHierarchy = {
    'guest': 1,
    'client': 2,
    'sales': 3,
    'admin': 4,
  };

  const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const refreshToken = async () => {
  try {
    await authAPI.refreshToken();
  } catch (error) {
    logout();
  }
};