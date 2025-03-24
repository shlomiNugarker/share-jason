import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations
import enCommon from "./locales/en/common.json";
import heCommon from "./locales/he/common.json";
import enButterfly from "./locales/en/butterfly.json";
import heButterfly from "./locales/he/butterfly.json";
import enCompatibility from "./locales/en/compatibility.json";
import heCompatibility from "./locales/he/compatibility.json";
import enSchema from "./locales/en/schema.json";
import heSchema from "./locales/he/schema.json";

// Valid languages supported by the application
const VALID_LANGUAGES = ['en', 'he'];

// Define default namespace
export const defaultNS = 'common';

// Define resources structure for better type support
export const resources = {
  en: {
    common: enCommon,
    butterfly: enButterfly,
    compatibility: enCompatibility,
    schema: enSchema,
  },
  he: {
    common: heCommon,
    butterfly: heButterfly, 
    compatibility: heCompatibility,
    schema: heSchema,
  },
} as const;

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

// Get user's preferred language based on browser and stored preferences
const getUserLanguage = () => {
  try {
    // First check localStorage for saved preference
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && VALID_LANGUAGES.includes(savedLanguage)) {
      console.log("Using saved language preference:", savedLanguage);
      return savedLanguage;
    }
    
    // Otherwise use browser language
    const userLang = navigator.language || navigator?.languages?.[0];
    const browserLang = userLang?.split("-")[0];
    
    // If browser language isn't supported, default to Hebrew
    if (!browserLang || !VALID_LANGUAGES.includes(browserLang)) {
      console.log("Browser language not supported, using default Hebrew");
      return 'he';
    }
    
    console.log("Using browser language:", browserLang);
    return browserLang;
  } catch (error) {
    console.error("Error getting user language:", error);
    return 'he'; // Default fallback
  }
};

// Save language preference to localStorage and update document properties
const saveLanguagePreference = (language: string) => {
  try {
    if (VALID_LANGUAGES.includes(language)) {
      console.log("Saving language preference:", language);
      localStorage.setItem("language", language);
      
      // Update document properties for RTL/LTR
      document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    } else {
      console.error("Attempted to save invalid language:", language);
    }
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
};

// Initialize i18n instance
i18n
  // Load translations from backend if needed - uncomment these lines for dynamic loading
  // .use(Backend)
  // Auto-detect user language
  .use(LanguageDetector)
  // React integration
  .use(initReactI18next)
  // Initialize
  .init({
    // Resources (translations) - preloaded for small applications
    // For large apps, use HTTP backend instead and comment this out
    resources,
    
    // Default namespace
    defaultNS,
    
    // Current language
    lng: getUserLanguage(),
    
    // Fallback language
    fallbackLng: "he",
    
    // Namespaces to load
    ns: ['common', 'butterfly', 'compatibility', 'schema'],

    // Cache detection results
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },
    
    // Don't escape special characters since React handles this
    interpolation: {
      escapeValue: false,
    },
    
    // Recommended for React
    react: {
      useSuspense: true,
    },
    
    // Return empty string instead of null/undefined for missing keys
    returnNull: false,
    returnEmptyString: false,
    
    // Enable in development, disable in production
    debug: process.env.NODE_ENV === 'development',
  });

// Add listener to save language when changed
i18n.on('languageChanged', saveLanguagePreference);

// Set initial document properties
const currentLang = i18n.language;
document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
document.documentElement.lang = currentLang;

// Export instance
export default i18n;
