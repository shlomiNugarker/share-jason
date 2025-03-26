import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Menu, X, LogOut, User, Home, Database } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const menuItems = [
    {
      label: "בית",
      path: "/",
      roles: [""],
      icon: <Home className="w-4 h-4" />
    },
    {
      label: "סכמות",
      path: "/schemas",
      roles: ["user", "admin"],
      icon: <Database className="w-4 h-4" />
    },
    {
      label: "ניהול מערכת",
      path: "/dashboard",
      roles: ["admin"],
      icon: <User className="w-4 h-4" />
    },
  ];

  const authItems = [
    {
      label: "התחברות",
      path: "/login",
      icon: <User className="w-4 h-4" />
    },
    {
      label: "הרשמה",
      path: "/register",
      icon: <User className="w-4 h-4" />
    },
  ];

  const renderMenuItems = (isMobile: boolean = false) => (
    <>
      <li className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </li>
      {menuItems
        .filter((item) => !user || (user && item.roles.includes(user.role) || item.roles.includes("")))
        .map((item, index) => (
          <NavigationMenuItem key={index} asChild>
            <li>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`text-lg transition-all duration-300 px-4 py-2 rounded-xl ${
                    isDark ? 'hover:bg-[#30363d]' : 'hover:bg-white/20'
                  } flex items-center gap-2 ${
                    isMobile ? "text-center justify-center w-full block" : ""
                  }`}
                >
                  {item.icon}
                  {String(item.label)}
                </Link>
              </motion.div>
            </li>
          </NavigationMenuItem>
        ))}

      {user ? (
        <NavigationMenuItem asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={logout}
              variant="ghost"
              className={`text-lg px-4 py-2 rounded-xl flex items-center gap-2 ${
                isDark 
                  ? 'hover:bg-[#f85149]/10 hover:text-[#f85149] dark:bg-transparent' 
                  : 'hover:bg-destructive/20 hover:text-destructive'
              }`}
            >
              <LogOut className="w-4 h-4" />
              התנתקות
            </Button>
          </motion.div>
        </NavigationMenuItem>
      ) : (
        authItems.map((item, index) => (
          <NavigationMenuItem key={index} asChild>
            <li>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`text-lg transition-all duration-300 px-4 py-2 rounded-xl ${
                    isDark ? 'hover:bg-[#30363d]' : 'hover:bg-white/20'
                  } flex items-center gap-2 ${
                    isMobile ? "text-center justify-center w-full block" : ""
                  }`}
                >
                  {item.icon}
                  {String(item.label)}
                </Link>
              </motion.div>
            </li>
          </NavigationMenuItem>
        ))
      )}
    </>
  );

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`shadow-lg ${
        isDark 
          ? 'bg-[#161b22] border-b border-[#30363d]' 
          : 'gradient-bg'
      } sticky w-full z-50 top-0 backdrop-blur-lg`}
    >
      <header className="container mx-auto z-10 top-0 flex justify-between items-center p-4 md:p-6 text-white">
        {user && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
              isDark 
                ? 'bg-[#30363d] text-[#c9d1d9]' 
                : 'bg-white/20 text-white'
            } flex items-center justify-center font-bold text-lg shadow-md`}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className={`${
              isDark ? 'text-[#c9d1d9]' : 'text-white'
            } font-semibold text-base md:text-lg truncate`}>
              שלום, {user.name}!
            </span>
          </motion.div>
        )}

        <button
          aria-label="Menu"
          onClick={toggleMenu}
          className={`md:hidden focus:outline-none ${
            isDark 
              ? 'text-[#c9d1d9] hover:bg-[#30363d]' 
              : 'text-white button-icon bg-transparent hover:bg-white/10'
          } rounded-md p-2`}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <NavigationMenu dir={i18n.dir()} className="hidden md:flex">
          <NavigationMenuList className="flex gap-3 md:gap-6">
            {renderMenuItems()}
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`top-full left-0 w-full ${
              isDark 
                ? 'bg-[#161b22] border-t border-[#30363d] text-[#c9d1d9]'
                : 'text-white gradient-bg' 
            } md:hidden overflow-hidden shadow-lg`}
          >
            <ul className="flex flex-col p-4 md:p-6 items-center justify-center space-y-4">
              {renderMenuItems(true)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
