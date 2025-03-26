import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { User, Mail, Key, Lock } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError(t("auth.passwords_not_match"));
      return;
    }

    setLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (_) {
      setError(t("auth.registration_failed"));
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      type: "text",
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      placeholder: t("auth.name"),
      icon: <User className={`h-5 w-5 ${isDark ? 'text-[#8b949e]' : 'text-gray-400'}`} />,
      required: true
    },
    {
      type: "email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      placeholder: t("auth.email"),
      icon: <Mail className={`h-5 w-5 ${isDark ? 'text-[#8b949e]' : 'text-gray-400'}`} />,
      required: true
    },
    {
      type: "password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      placeholder: t("auth.password"),
      icon: <Key className={`h-5 w-5 ${isDark ? 'text-[#8b949e]' : 'text-gray-400'}`} />,
      required: true
    },
    {
      type: "password",
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value),
      placeholder: t("auth.confirm_password"),
      icon: <Lock className={`h-5 w-5 ${isDark ? 'text-[#8b949e]' : 'text-gray-400'}`} />,
      required: true
    }
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-[#0d1117] text-[#c9d1d9]' : 'bg-gradient-to-br from-purple-600 to-indigo-800'
    }`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-md ${
        isDark ? 'bg-[#161b22] border border-[#30363d]' : 'bg-white'
      }`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            isDark ? 'text-[#c9d1d9]' : 'text-gray-900'
          }`}>
            {t("auth.register")}
          </h2>
          <p className={`mt-2 text-center text-sm ${
            isDark ? 'text-[#8b949e]' : 'text-gray-600'
          }`}>
            {t("auth.create_account")}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className={`rounded-md p-4 ${
              isDark ? 'bg-[#b62324]/20 border border-[#f85149]/40 text-[#f85149]' : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            {inputFields.map((field, index) => (
              <div key={index}>
                <label htmlFor={field.placeholder} className="sr-only">
                  {field.placeholder}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {field.icon}
                  </div>
                  <input
                    id={field.placeholder}
                    name={field.placeholder}
                    type={field.type}
                    required={field.required}
                    className={`appearance-none rounded-none relative block w-full px-3 py-3 border ${
                      isDark 
                        ? 'bg-[#0d1117] border-[#30363d] text-[#c9d1d9] placeholder-[#8b949e] focus:ring-[#2188ff] focus:border-[#2188ff]' 
                        : 'border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
                    } focus:outline-none focus:z-10 ${
                      index === 0 ? 'rounded-t-md' : index === inputFields.length - 1 ? 'rounded-b-md' : ''
                    }`}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    dir="ltr"
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isDark 
                  ? 'bg-[#238636] hover:bg-[#2ea043] focus:ring-[#238636]' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("auth.registering")}
                </>
              ) : (
                t("auth.register")
              )}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <Link
                to="/login"
                className={`font-medium ${
                  isDark ? 'text-[#58a6ff] hover:text-[#58a6ff]/90' : 'text-indigo-600 hover:text-indigo-500'
                }`}
              >
                {t("auth.already_have_account")}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
