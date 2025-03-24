// Token management & authentication service
const TOKEN_KEY = 'auth_token';

// Safe way to interact with localStorage that handles exceptions
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  }
};

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Auth Service with token management
export const authService = {
  // Token management
  getToken: (): string | null => {
    return safeLocalStorage.getItem(TOKEN_KEY);
  },
  
  setToken: (token: string): void => {
    console.log("Attempting to save token:", token.substring(0, 10) + "...");
    
    if (!token) {
      console.error("Attempted to save empty token!");
      return;
    }
    
    // נסה לשמור את הטוקן עד 3 פעמים
    let success = false;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (!success && attempts < maxAttempts) {
      attempts++;
      success = safeLocalStorage.setItem(TOKEN_KEY, token);
      
      if (success) {
        // בדוק שהטוקן נשמר
        const savedToken = safeLocalStorage.getItem(TOKEN_KEY);
        success = !!savedToken && savedToken === token;
      }
      
      if (!success && attempts < maxAttempts) {
        console.warn(`Token save attempt ${attempts} failed, retrying...`);
        // המתן מעט בין ניסיונות
        new Promise(resolve => setTimeout(resolve, 50));
      }
    }
    
    console.log(`Token save ${success ? 'succeeded' : 'failed'} after ${attempts} attempts`);
    
    if (!success) {
      console.error("Failed to save token to localStorage after multiple attempts");
      // התראה למשתמש
      alert("שגיאה בשמירת הטוקן. ייתכן שתצטרך להתחבר מחדש.");
    }
  },
  
  removeToken: (): void => {
    safeLocalStorage.removeItem(TOKEN_KEY);
  },
  
  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },

  // API methods - these will be called from the AuthContext
  async login(baseUrl: string, credentials: LoginCredentials): Promise<AuthResponse> {
    console.log("Auth service: login attempt");
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'שגיאה בהתחברות');
    }
    
    const data = await response.json();
    console.log("Login response:", {
      hasToken: !!data.token,
      tokenStart: data.token ? data.token.substring(0, 10) + "..." : "none",
      user: data.user
    });
    
    if (!data.token) {
      console.error("No token in response:", data);
      throw new Error('לא התקבל טוקן מהשרת');
    }
    
    authService.setToken(data.token);
    
    // כדאי גם לבדוק האם באמת הטוקן נשמר
    setTimeout(() => {
      const tokenExists = !!authService.getToken();
      console.log("Token persistence check (after delay):", tokenExists);
    }, 100);
    
    return data;
  },
  
  async register(baseUrl: string, credentials: RegisterCredentials): Promise<AuthResponse> {
    console.log("Auth service: register attempt");
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'שגיאה בהרשמה');
    }
    
    const data = await response.json();
    console.log("Register response:", {
      hasToken: !!data.token,
      tokenStart: data.token ? data.token.substring(0, 10) + "..." : "none",
      user: data.user
    });
    
    // בעת הרשמה, נשתמש בנתונים שחזרו מהשרת והמשתמש יצטרך להתחבר
    // אלא אם השרת מחזיר טוקן
    if (data.token) {
      authService.setToken(data.token);
      
      // בדיקה אם הטוקן נשמר
      setTimeout(() => {
        const tokenExists = !!authService.getToken();
        console.log("Token after registration (delay check):", tokenExists);
      }, 100);
    }
    
    return data;
  },
  
  async getUser(baseUrl: string): Promise<User> {
    const token = authService.getToken();
    
    if (!token) {
      console.error("אין טוקן אותנטיקציה באחסון המקומי");
      throw new Error('אין טוקן אותנטיקציה');
    }
    
    console.log("Getting user with token:", token.substring(0, 10) + "...");
    
    // משתנים לניסיונות חוזרים
    const maxRetries = 2;
    let retryCount = 0;
    let lastError: any = null;
    
    while (retryCount <= maxRetries) {
      try {
        // אם זהו ניסיון חוזר, המתן לפני הניסיון הבא
        if (retryCount > 0) {
          console.log(`ניסיון ${retryCount}/${maxRetries} לקבלת נתוני משתמש...`);
          // המתן 1 שניה בין הניסיונות
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        const response = await fetch(`${baseUrl}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // בדיקת תשובת השרת
        if (response.status === 401) {
          console.error("Token rejected by server - Unauthorized (401)");
          throw new Error('טוקן לא תקף או פג תוקף');
        }
        
        if (response.status === 404) {
          console.error("Endpoint not found (404) - API URL might be incorrect");
          throw new Error('נתיב API לא נמצא - בדוק את כתובת השרת');
        }
        
        if (!response.ok) {
          console.error("Failed to get user:", response.status, response.statusText);
          
          // נסה לקרוא את תוכן השגיאה
          try {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            throw new Error(errorData.message || 'שגיאה בטעינת משתמש');
          } catch (parseError) {
            throw new Error(`שגיאת שרת (${response.status}): ${response.statusText}`);
          }
        }
        
        // בדיקה האם יש תוכן בתשובה
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error("Invalid content type from server:", contentType);
          throw new Error('תשובה לא תקינה מהשרת (לא JSON)');
        }
        
        const data = await response.json();
        console.log("User data response:", data);
        
        if (!data) {
          console.error("Empty response from server");
          throw new Error('תשובה ריקה מהשרת');
        }
        
        // השרת יכול להחזיר או אובייקט user או אובייקט המכיל user
        if (data.user) {
          return data.user;
        }
        
        // או שמא חזר אובייקט המשתמש עצמו
        if (data.email || data._id || data.id) {
          return {
            id: data._id || data.id,
            email: data.email,
            name: data.name || data.username || data.email.split('@')[0]
          };
        }
        
        console.error("Invalid user data format:", data);
        throw new Error('פורמט נתוני משתמש לא תקין');
      } catch (error: any) {
        lastError = error;
        
        // שמור את הטוקן במקרה של שגיאת רשת
        const isNetworkError = error instanceof TypeError || 
                              (error.message && (
                                error.message.includes('Failed to fetch') || 
                                error.message.includes('Network error') ||
                                error.message.includes('שגיאת רשת')
                              ));
        
        if (isNetworkError && retryCount < maxRetries) {
          console.warn(`Network error when fetching user (attempt ${retryCount + 1}/${maxRetries + 1}) - will retry`);
          retryCount++;
          continue;
        } else if (isNetworkError) {
          console.error("Network error when fetching user after all retries - keeping token");
          throw new Error('שגיאת רשת - בדוק את החיבור לאינטרנט');
        }
        
        // זו לא שגיאת רשת, או שמיצינו את מספר הניסיונות
        break;
      }
    }
    
    // אם הגענו לכאן, כל הניסיונות נכשלו
    throw lastError || new Error('לא ניתן לקבל נתוני משתמש לאחר מספר ניסיונות');
  },
  
  logout(): void {
    authService.removeToken();
  }
};
