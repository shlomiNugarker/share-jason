import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Menu, X, LogOut, User, Home, Layers, Database, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "./LanguageToggle";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const menuItems = [
    {
      label: t("home_page"),
      path: "/",
      roles: [""],
      icon: <Home className="w-4 h-4" />
    },
    {
      label: "Items",
      path: "/items",
      roles: ["user", "admin"],
      icon: <Layers className="w-4 h-4" />
    },
    {
      label: "Schemas",
      path: "/schemas",
      roles: ["user", "admin"],
      icon: <Database className="w-4 h-4" />
    },
    {
      label: "butterfly-hosts",
      path: "/butterfly-hosts",
      roles: ["user", "admin"],
      icon: <Globe className="w-4 h-4" />
    },
    {
      label: t("admin_dashboard"),
      path: "/admin/users",
      roles: ["admin"],
      icon: <User className="w-4 h-4" />
    },
  ];

  const authItems = [
    {
      label: t("login_page"),
      path: "/login",
    },
    {
      label: t("register_page"),
      path: "/register",
    },
  ];

  const renderMenuItems = (isMobile: boolean = false) => (
    <>
      <li>
        <LanguageToggle />
      </li>
      {menuItems
        .filter((item) => user && item.roles.includes(user.role))
        .map((item, index) => (
          <NavigationMenuItem key={index} asChild>
            <li>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.path}
                  className={`text-lg transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/20 flex items-center gap-2 ${
                    isMobile ? "text-center justify-center w-full block" : ""
                  }`}
                >
                  {item.icon}
                  {item.label}
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
              variant="light"
              className="text-lg px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-100 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              {t("logout")}
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
                  className={`text-lg transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/20 flex items-center gap-2 ${
                    isMobile ? "text-center justify-center w-full block" : ""
                  }`}
                >
                  <User className="w-4 h-4" />
                  {item.label}
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
      className="shadow-lg bg-gradient-to-r from-purple-600 to-teal-500 sticky w-full z-100 top-0 backdrop-blur-lg"
    >
      <header className="container mx-auto z-10 top-0 flex justify-between items-center p-6 text-white">
        {user && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-lg shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-white font-semibold text-lg truncate">
              {t("welcome")}, {user.name}!
            </span>
          </motion.div>
        )}

        <button
          aria-label="Menu"
          onClick={toggleMenu}
          className="md:hidden focus:outline-none text-white"
        >
          {isMenuOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </button>

        <NavigationMenu dir={i18n.dir()} className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
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
            className="top-full left-0 w-full text-white bg-gradient-to-r from-purple-700 to-teal-600 md:hidden overflow-hidden"
          >
            <ul className="flex flex-col p-6 items-center justify-center space-y-4">
              {renderMenuItems(true)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Header;
