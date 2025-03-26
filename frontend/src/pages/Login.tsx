import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.errors.allFields", "אנא מלא את כל השדות"));
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      if (err.message === "Invalid credentials") {
        setError(t("auth.errors.invalidCredentials", "שם משתמש או סיסמה שגויים"));
      } else {
        setError(t("auth.errors.generalError", "אירעה שגיאה בהתחברות, אנא נסה שוב"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-[#0d1117] text-[#c9d1d9]' : 'bg-gray-50 text-gray-800'
    }`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-md ${
        isDark ? 'bg-[#161b22] border border-[#30363d]' : 'bg-white'
      }`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            isDark ? 'text-[#c9d1d9]' : 'text-gray-900'
          }`}>
            {t("auth.login", "התחברות")}
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDark ? 'text-[#8b949e]' : 'text-gray-600'
          }`}>
            {t("auth.loginSubtitle", "התחבר כדי לנהל את הקבצים שלך")}
          </p>
        </div>
        
        {error && (
          <div className={`rounded-md p-4 ${
            isDark ? 'bg-[#b62324]/20 border border-[#f85149]/40 text-[#f85149]' : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                {t("auth.email", "דואר אלקטרוני")}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark 
                    ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder-[#8b949e] focus:ring-[#2188ff] focus:border-[#2188ff]' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-purple-500 focus:border-purple-500'
                } focus:outline-none focus:z-10 rounded-t-md`}
                placeholder={t("auth.email", "דואר אלקטרוני")}
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t("auth.password", "סיסמה")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark 
                    ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder-[#8b949e] focus:ring-[#2188ff] focus:border-[#2188ff]' 
                    : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-purple-500 focus:border-purple-500'
                } focus:outline-none focus:z-10 rounded-b-md`}
                placeholder={t("auth.password", "סיסמה")}
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 ${
                  isDark 
                    ? 'bg-[#0d1117] border-[#30363d] text-[#2188ff] focus:ring-[#2188ff]' 
                    : 'border-gray-300 text-purple-600 focus:ring-purple-500'
                } rounded`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${
                isDark ? 'text-[#8b949e]' : 'text-gray-600'
              }`}>
                {t("auth.rememberMe", "זכור אותי")}
              </label>
            </div>
            
            <div className="text-sm">
              <Link to="/forgot-password" className={`font-medium ${
                isDark ? 'text-[#58a6ff] hover:text-[#58a6ff]/90' : 'text-purple-600 hover:text-purple-500'
              }`}>
                {t("auth.forgotPassword", "שכחת סיסמה?")}
              </Link>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isDark 
                  ? 'bg-[#238636] hover:bg-[#2ea043] focus:ring-[#238636]' 
                  : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? t("common.loading", "טוען...") : t("auth.login", "התחברות")}
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <Link to="/register" className={`font-medium ${
                isDark ? 'text-[#58a6ff] hover:text-[#58a6ff]/90' : 'text-purple-600 hover:text-purple-500'
              }`}>
                {t("auth.noAccount", "אין לך חשבון? הירשם עכשיו")}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
