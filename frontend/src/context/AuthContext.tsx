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

      // השהייה קצרה כדי לוודא שהטוקן נטען לגמרי
      await new Promise(resolve => setTimeout(resolve, 300));

      try {
        console.log("🔍 Attempting to fetch user with token:", token.substring(0, 10) + "...");
        
        const response = await fetch(`${httpService.baseUrl}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          console.error("🔍 Error response:", response.status, response.statusText);
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("🔍 User data fetched successfully:", data);
        
        setUser(data.user || data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("🔍 Failed to fetch user:", err);
        
        // הוסף דיאלוג אישור לפני מחיקת הטוקן
        const confirmLogout = window.confirm(
          "אירעה שגיאה בטעינת נתוני המשתמש. האם ברצונך להתנתק?\n" +
          "(לחיצה על 'ביטול' תשמור את הטוקן ותאפשר לנסות שוב)"
        );
        
        if (confirmLogout) {
          localStorage.removeItem("token");
          setToken(null);
          setError(t("session_expired"));
        } else {
          console.log("🔍 User canceled logout, keeping token");
          // אם המשתמש ביטל, ננסה לטעון מחדש את העמוד
          window.location.reload();
        }
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
      console.log("🔐 Attempting login for:", email);
      
      const data = await httpService.post("/api/auth/login", {
        email,
        password
      }, false);
      
      const { token, user } = data;
      
      console.log("🔐 Login successful, received token:", token ? token.substring(0, 10) + "..." : "no token");
      
      if (!token) {
        console.error("🔐 No token in response!");
        setError("No token received from server");
        return false;
      }
      
      // שמור את הטוקן בלוקל סטורג'
      localStorage.setItem("token", token);
      
      // וודא שהטוקן נשמר נכון
      const savedToken = localStorage.getItem("token");
      console.log("🔐 Token saved to localStorage:", !!savedToken);
      
      if (!savedToken) {
        console.error("🔐 Failed to save token to localStorage!");
        // ננסה לשמור שוב
        localStorage.setItem("token", token);
        
        // בדיקה נוספת
        const retryToken = localStorage.getItem("token");
        if (!retryToken) {
          console.error("🔐 Second attempt to save token failed!");
          alert("שגיאה בשמירת הטוקן. ייתכן שתצטרך להתחבר מחדש.");
        }
      }
      
      // הגדר את הטוקן והמשתמש במצב
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      
      // בדיקה אחרי השהייה קצרה שהכל עובד
      setTimeout(() => {
        const checkToken = localStorage.getItem("token");
        console.log("🔐 Token check after delay:", !!checkToken);
      }, 500);
      
      toast.success(t("login_success"));
      return true;
    } catch (err: any) {
      console.error("🔐 Login failed:", err);
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
