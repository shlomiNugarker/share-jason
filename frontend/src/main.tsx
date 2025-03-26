import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import "./i18n.ts";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { initializeTheme } from "./utils/theme.ts";

// Initialize theme before rendering
initializeTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <AuthProvider>
          <ScrollToTop />
          <App />
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>
);
