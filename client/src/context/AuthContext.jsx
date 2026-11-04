
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');

      const currentUser = data.data?.user;

      setUser(currentUser || null);

      return currentUser || null;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (credentials) => {
    try {
      const { data } = await api.post(
        '/auth/login',
        credentials
      );

      const currentUser = data.data?.user;

      if (!currentUser) {
        throw new Error('Invalid login response from server');
      }

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Login failed';

      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
