const API_BASE_URL = 'http://localhost:8000';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'guest' | 'client' | 'sales' | 'admin';
  first_name: string;
  last_name: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const authAPI = {
  // Login user
  login: async (identifier: string, password: string) => {
    // Determine if identifier is email or username
    const isEmail = identifier.includes('@');
    const loginData = isEmail 
      ? { email: identifier, password }
      : { username: identifier, password };

    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData),
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

// Product API functions
export const productAPI = {
  // Get products with optional filtering
  getProducts: async (options?: {
    search?: string;
    category?: string;
    family?: string;
    limit?: number;
    offset?: number;
  }) => {
    const token = getAccessToken();
    if (!token) throw new Error('No access token');

    const params = new URLSearchParams();
    if (options?.search) params.append('search', options.search);
    if (options?.category) params.append('category', options.category);
    if (options?.family) params.append('family', options.family);
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());

    const url = `${API_BASE_URL}/api/products/${params.toString() ? `?${params.toString()}` : ''}`;

    const response = await fetch(url, {
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
          const retryResponse = await fetch(url, {
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
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },

  // Get single product by ID
  getProduct: async (id: number) => {
    const token = getAccessToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_BASE_URL}/api/products/${id}/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        await refreshToken();
        const newToken = getAccessToken();
        if (newToken) {
          const retryResponse = await fetch(`${API_BASE_URL}/api/products/${id}/`, {
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
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },

  // Get single product by ISIN
  getProductByIsin: async (isin: string) => {
    const token = getAccessToken();
    console.log('ISIN API: Starting request for ISIN:', isin);
    console.log('ISIN API: Access token:', token ? 'Present' : 'Missing');
    
    if (!token) {
      console.error('ISIN API: No access token found');
      throw new Error('No access token');
    }

    const makeRequest = async (authToken: string) => {
      console.log('ISIN API: Making request with token:', authToken.substring(0, 20) + '...');
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };
      console.log('ISIN API: Request headers:', headers);
      
      return fetch(`${API_BASE_URL}/api/products/isin/${isin}/`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
      });
    };

    let response = await makeRequest(token);
    console.log('ISIN API: Response status:', response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.log('ISIN API: Token expired, attempting refresh...');
        try {
          await refreshToken();
          const newToken = getAccessToken();
          if (newToken && newToken !== token) {
            console.log('ISIN API: Token refreshed, retrying request...');
            response = await makeRequest(newToken);
            if (response.ok) {
              return response.json();
            }
          }
          console.error('ISIN API: Token refresh failed or token unchanged');
          logout();
          throw new Error('Authentication failed - please log in again');
        } catch (refreshError) {
          console.error('ISIN API: Token refresh error:', refreshError);
          logout();
          throw new Error('Authentication failed - please log in again');
        }
      }
      
      if (response.status === 404) {
        throw new Error(`Product not found with ISIN: ${isin}`);
      }
      
      // Log the actual error details for debugging
      const errorText = await response.text();
      console.error(`ISIN API Error: ${response.status} - ${response.statusText}`, errorText);
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
  },

  // Get categories
  getCategories: async () => {
    const token = getAccessToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_BASE_URL}/api/categories/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        await refreshToken();
        const newToken = getAccessToken();
        if (newToken) {
          const retryResponse = await fetch(`${API_BASE_URL}/api/categories/`, {
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
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  },

  // Get product stats
  getProductStats: async () => {
    const token = getAccessToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_BASE_URL}/api/product-stats/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        await refreshToken();
        const newToken = getAccessToken();
        if (newToken) {
          const retryResponse = await fetch(`${API_BASE_URL}/api/product-stats/`, {
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
      throw new Error('Failed to fetch product stats');
    }

    return response.json();
  },
};