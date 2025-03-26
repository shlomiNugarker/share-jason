import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register", "/"];
  const isAuthPage = hideHeaderRoutes.includes(location.pathname);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`flex flex-col min-h-screen relative ${
      isDark 
        ? 'bg-[#0d1117]' // GitHub dark background
        : 'bg-gray-50'
    }`}>
      {/* Decorative background elements - visible only in light mode */}
      {!isAuthPage && !isDark && (
        <>
          <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-16 -right-16 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-16 -left-16 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          <div className="fixed w-full h-1 top-0 left-0 gradient-bg z-50"></div>
        </>
      )}

      {/* Dark mode specific decorative elements */}
      {!isAuthPage && isDark && (
        <div className="fixed w-full h-1 top-0 left-0 bg-[#30363d] z-50"></div>
      )}

      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      
      <motion.main 
        className="flex-grow z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={location.pathname}
      >
        <Outlet />
      </motion.main>

      {!isAuthPage && (
        <footer className={`w-full py-6 mt-auto text-center ${
          isDark 
            ? 'text-[#8b949e]' // GitHub dark muted text
            : 'text-gray-500'
        } text-sm`}>
          <p>© {new Date().getFullYear()} - כל הזכויות שמורות</p>
        </footer>
      )}
    </div>
  );
};

export default Layout;
