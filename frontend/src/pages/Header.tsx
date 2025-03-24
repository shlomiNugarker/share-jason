import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { to: "/", label: t("common.home_page", "דף הבית") },
    { to: "/items", label: t("common.items", "פריטים") },
    { to: "/schemas", label: t("common.schemas", "סכמות") },
    { to: "/butterfly-hosts", label: t("common.butterfly_hosts", "פרפרים מארחים") },
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-lg font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              ShareJson
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.to)
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-700 hover:text-indigo-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                {t("common.welcome", "ברוך הבא")}, {user.name}
              </span>
              <button
                onClick={logout}
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {t("auth.logout", "התנתקות")}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-indigo-500 font-medium"
              >
                {t("auth.login", "התחברות")}
              </Link>
              <Link
                to="/register"
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {t("auth.register", "הרשמה")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-2 text-base font-medium ${
                isActive(link.to)
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-500"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="border-t border-gray-200 pt-4 px-4 flex flex-col space-y-3">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  {t("common.welcome", "ברוך הבא")}, {user.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 w-full"
                >
                  {t("auth.logout", "התנתקות")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-500 font-medium py-2 px-4 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("auth.login", "התחברות")}
                </Link>
                <Link
                  to="/register"
                  className="block text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("auth.register", "הרשמה")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 