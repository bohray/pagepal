import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import axios from "axios";
import { usersAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await usersAPI.checkUser();
      if (response?.data?.user) setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const userData = { email, password };
    const response = await usersAPI.login(userData);
    if (response) setUser(response.data.user);
    return response.data;
  };

  const signup = async (username, email, password) => {
    const data = { username, email, password };
    const response = await usersAPI.signup(data);
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    await usersAPI.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
    }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
