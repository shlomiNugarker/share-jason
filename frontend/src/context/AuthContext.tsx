import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { httpService } from "@/services/http.service";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { t } = useTranslation();
  
  const navigate = useNavigate();

  // Load user from token on startup
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await httpService.get("/api/auth/user", true);
        setUser(response.user);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem("token");
        setToken(null);
        setError(t("session_expired"));
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token, t]);

  // Login user
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await httpService.post("/api/auth/login", {
        email,
        password
      }, false);
      
      const { token, user } = data;
      
      localStorage.setItem("token", token);
      
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success(t("login_success"));
      return true;
    } catch (err: any) {
      const errorMessage = err.message || t("login_failed");
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await httpService.post("/api/auth/register", {
        name,
        email,
        password
      }, false);
      
      const { token, user } = data;
      
      localStorage.setItem("token", token);
      
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      toast.success(t("register_success"));
      return true;
    } catch (err: any) {
      const errorMessage = err.message || t("registration_failed");
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.success(t("logout"));
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
