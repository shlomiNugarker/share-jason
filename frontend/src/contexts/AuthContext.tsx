import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService, User } from "@/services/auth.service";
import { httpService } from "@/services/http.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  checkAuthStatus: () => { token: string | null; isAuth: boolean; user: User | null };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  
  const navigate = useNavigate();

  // Load user from token on startup
  useEffect(() => {
    const loadUser = async () => {
      // בדיקה אם קיים טוקן
      const token = authService.getToken();
      console.log("🔍 Initial Auth Check:", { 
        tokenExists: !!token, 
        tokenLength: token?.length || 0
      });
      
      if (!token) {
        console.log("🔍 No token found on initial load");
        setLoading(false);
        return;
      }

      let retryCount = 0;
      const maxRetries = 2;
      
      while (retryCount <= maxRetries) {
        try {
          if (retryCount > 0) {
            console.log(`🔍 ניסיון ${retryCount}/${maxRetries} לטעינת משתמש...`);
            // המתן לפני ניסיון נוסף
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          
          console.log("🔍 Attempting to fetch user data with token");
          const userData = await authService.getUser(httpService.baseUrl);
          console.log("🔍 User data fetched successfully:", userData);
          
          if (!userData || !userData.id) {
            console.error("🔍 Invalid user data received:", userData);
            throw new Error("Invalid user data format");
          }
          
          setUser(userData);
          setIsAuthenticated(true);
          
          // מידע למפתח/ת
          console.log("🔍 Authentication successful, user loaded:", {
            user: userData,
            isAuthenticated: true,
            tokenExists: !!authService.getToken()
          });
          
          // יצאנו מהלולאה בהצלחה
          break;
        } catch (err: any) {
          console.error(`🔍 Error fetching user data (attempt ${retryCount + 1}/${maxRetries + 1}):`, err);
          
          // בדוק אם זו שגיאת רשת
          const isNetworkError = err instanceof TypeError || 
                                (err.message && (
                                  err.message.includes('Failed to fetch') || 
                                  err.message.includes('Network error') ||
                                  err.message.includes('שגיאת רשת')
                                ));
          
          if (isNetworkError && retryCount < maxRetries) {
            console.warn("🔍 Network error, will retry...");
            retryCount++;
            continue;
          }
          
          // אם יש שגיאת טוקן לא תקף, נמחק את הטוקן ישירות
          if (err.message && err.message.includes('טוקן לא תקף')) {
            console.log("🔍 Invalid token detected, logging out");
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            setError("הפעלה פקעה. יש להתחבר מחדש.");
          } else {
            // נוסיף חלון התראה לפני שנמחק את הטוקן
            const confirmLogout = window.confirm(
              "אירעה שגיאה בטעינת נתוני המשתמש. האם ברצונך להתנתק?\n" +
              "(לחיצה על 'ביטול' תשמור את הטוקן ותאפשר לנסות שוב)"
            );
            
            if (confirmLogout) {
              console.log("🔍 User confirmed logout after error");
              authService.logout();
              setUser(null);
              setIsAuthenticated(false);
              setError("הפעלה פקעה. יש להתחבר מחדש.");
            } else {
              console.log("🔍 User canceled logout, keeping token");
              // נשאיר את הטוקן ורק נאפס את מצב הטעינה
            }
          }
          
          // יוצאים מהלולאה עם שגיאה
          break;
        }
      }
      
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login user
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("🔐 ניסיון התחברות עבור:", email);
      
      const response = await authService.login(httpService.baseUrl, { email, password });
      
      console.log("🔐 התחברות הצליחה, נתוני תשובה:", {
        hasToken: !!response.token,
        tokenLength: response.token?.length,
        user: response.user ? {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email
        } : 'No user data'
      });
      
      if (!response.token) {
        console.error("🔐 חסר טוקן בתשובה מהשרת!");
        setError("חסר טוקן בתשובה מהשרת");
        return false;
      }
      
      // קבע את נתוני המשתמש והאותנטיקציה
      setUser(response.user);
      setIsAuthenticated(true);
      
      // בדיקה שהטוקן נשמר בהצלחה
      setTimeout(() => {
        const tokenExists = authService.isAuthenticated();
        const storedToken = localStorage.getItem('auth_token');
        console.log("🔐 בדיקת טוקן אחרי הפסקה קצרה:", {
          tokenExists,
          tokenInStorage: !!storedToken,
          tokenLength: storedToken?.length
        });
        
        if (!tokenExists) {
          console.error("🔐 הטוקן לא נמצא אחרי הפסקה קצרה!");
          
          // נסה לשמור שוב
          authService.setToken(response.token);
          
          // בדיקה אחרונה
          setTimeout(() => {
            const finalCheck = localStorage.getItem('auth_token');
            console.log("🔐 בדיקה סופית של טוקן:", !!finalCheck);
          }, 300);
        }
      }, 500);
      
      toast.success("התחברת בהצלחה!");
      return true;
    } catch (err: any) {
      console.error("🔐 התחברות נכשלה:", err);
      
      // בדוק אם זו שגיאת רשת
      const isNetworkError = err instanceof TypeError || 
                            (err.message && (
                              err.message.includes('Failed to fetch') || 
                              err.message.includes('Network error')
                            ));
      
      if (isNetworkError) {
        setError("בעיית תקשורת עם השרת. נסה שוב או בדוק את חיבור האינטרנט שלך.");
        toast.error("בעיית תקשורת עם השרת");
      } else {
        setError(err.message || "התחברות נכשלה. נא לנסות שנית.");
        toast.error("שגיאה בהתחברות. אנא נסה שנית.");
      }
      
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
      const response = await authService.register(httpService.baseUrl, {
        name,
        email,
        password
      });
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast.success("נרשמת בהצלחה!");
      return true;
    } catch (err: any) {
      setError(err.message || "ההרשמה נכשלה. נא לנסות שנית.");
      toast.error("שגיאה בהרשמה. אנא נסה שנית.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    toast.success("התנתקת בהצלחה!");
    navigate("/login");
  };

  // Add this function after the logout function in the AuthProvider component
  const checkAuthStatus = (): { token: string | null; isAuth: boolean; user: User | null } => {
    const token = authService.getToken();
    const isAuth = authService.isAuthenticated();
    
    console.log("🔍 Auth Status Check:", {
      isAuthenticated,
      hasUser: !!user,
      hasToken: !!token,
      tokenLength: token?.length || 0,
      storageToken: localStorage.getItem('auth_token')
    });
    
    if (token && !user) {
      toast.error("יש טוקן אבל אין משתמש - יש לרענן את הדף");
    } else if (!token && isAuthenticated) {
      toast.error("סתירה במצב אותנטיקציה - יש להתנתק ולהתחבר מחדש");
      setIsAuthenticated(false);
    } else if (token && !isAuth) {
      toast.error("יש טוקן אבל לא מזוהה כמחובר - יש תקלה במערכת");
    }
    
    return { token, isAuth, user };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
        checkAuthStatus
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