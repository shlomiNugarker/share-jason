import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { httpService } from "@/services/http.service";
import { authService } from "@/services/auth.service";

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
  const [token, setToken] = useState<string | null>(authService.getToken());
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
        console.log("🔍 Attempting to fetch user with token");
        const data = await httpService.get("/api/auth/me", true);
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
          authService.removeToken();
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
      
      const { token: newToken, user: userData } = data;
      
      console.log("🔐 Login successful, received token:", newToken ? newToken.substring(0, 10) + "..." : "no token");
      
      if (!newToken) {
        console.error("🔐 No token in response!");
        setError("No token received from server");
        return false;
      }
      
      // שמור את הטוקן באמצעות שירות האימות
      authService.setToken(newToken);
      
      // וודא שהטוקן נשמר נכון
      const savedToken = authService.getToken();
      console.log("🔐 Token saved:", !!savedToken);
      
      if (!savedToken) {
        console.error("🔐 Failed to save token!");
        // ננסה שוב
        authService.setToken(newToken);
        
        // בדיקה נוספת
        const retryToken = authService.getToken();
        if (!retryToken) {
          console.error("🔐 Second attempt to save token failed!");
          alert("שגיאה בשמירת הטוקן. ייתכן שתצטרך להתחבר מחדש.");
        }
      }
      
      // הגדר את הטוקן והמשתמש במצב
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      
      // בדיקה אחרי השהייה קצרה שהכל עובד
      setTimeout(() => {
        const checkToken = authService.getToken();
        console.log("🔐 Token check after delay:", !!checkToken);
        
        // אם הטוקן לא נשמר, ננסה שוב
        if (!checkToken) {
          console.warn("🔐 Token not found after delay, trying to save again");
          authService.setToken(newToken);
        }
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
      
      const { token: newToken, user: userData } = data;
      
      if (newToken) {
        authService.setToken(newToken);
      }
      
      setToken(newToken);
      setUser(userData);
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
    authService.removeToken();
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
