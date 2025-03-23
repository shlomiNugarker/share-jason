import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import heTranslation from "./locales/he.json";

// Valid languages supported by the application
const VALID_LANGUAGES = ['en', 'he'];

// Clear any potentially corrupted language state
try {
  // If there's a corrupted/invalid value in localStorage, remove it
  const savedLang = localStorage.getItem("language");
  if (savedLang && !VALID_LANGUAGES.includes(savedLang)) {
    console.warn("Invalid language found in localStorage, clearing:", savedLang);
    localStorage.removeItem("language");
  }
} catch (e) {
  console.error("Error checking localStorage:", e);
}

const getUserLanguage = () => {
  try {
    // First check localStorage for saved preference
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && VALID_LANGUAGES.includes(savedLanguage)) {
      console.log("Using saved language preference:", savedLanguage);
      return savedLanguage;
    }
    
    // Otherwise use browser language
    const userLang = navigator.language || navigator.languages[0];
    const browserLang = userLang.split("-")[0];
    
    // If browser language isn't supported, default to Hebrew
    if (!VALID_LANGUAGES.includes(browserLang)) {
      console.log("Browser language not supported, using default:", browserLang);
      return 'he';
    }
    
    console.log("Using browser language:", browserLang);
    return browserLang;
  } catch (error) {
    console.error("Error getting user language:", error);
    return 'he'; // Default fallback
  }
};

// Save language preference to localStorage whenever it changes
const saveLanguagePreference = (language: string) => {
  try {
    if (VALID_LANGUAGES.includes(language)) {
      console.log("Saving language preference:", language);
      localStorage.setItem("language", language);
      
      // Also update document properties
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    } else {
      console.error("Attempted to save invalid language:", language);
    }
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
};

// Create and initialize i18n instance
const initializeI18n = () => {
  try {
    i18n.use(initReactI18next).init({
      resources: {
        en: {
          translation: enTranslation,
        },
        he: {
          translation: heTranslation,
        },
      },
      lng: getUserLanguage(),
      fallbackLng: "he",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      debug: true, // Enable debug mode
    });

    // Add a listener to save language preferences
    i18n.on('languageChanged', saveLanguagePreference);
    
    // Set initial document properties
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    console.log("i18n initialized successfully with language:", i18n.language);
    
    return i18n;
  } catch (error) {
    console.error("Failed to initialize i18n:", error);
    // Try with minimal config as fallback
    try {
      i18n.use(initReactI18next).init({
        resources: {
          he: { translation: heTranslation }
        },
        lng: 'he',
        fallbackLng: 'he',
      });
      return i18n;
    } catch (e) {
      console.error("Critical error initializing i18n:", e);
      return i18n; // Return even if initialization failed
    }
  }
};

// Initialize i18n
const i18nInstance = initializeI18n();

// Add a global method to check if i18n is ready
(window as any).checkI18n = () => {
  console.log("Current language:", i18nInstance.language);
  console.log("Available languages:", i18nInstance.options.supportedLngs);
  console.log("Translations loaded:", i18nInstance.store.data);
  
  // Force language change for testing
  (window as any).forceLanguage = (lang: string) => {
    if (VALID_LANGUAGES.includes(lang)) {
      console.log("Forcing language change to:", lang);
      i18nInstance.changeLanguage(lang);
      localStorage.setItem("language", lang);
      setTimeout(() => window.location.reload(), 100);
      return true;
    }
    return false;
  };
};

export default i18nInstance;
