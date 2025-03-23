import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import enImgUrl from "../assets/en.png";
import heImgUrl from "../assets/he.png";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = i18n.language;
  
  // Debug when component renders
  useEffect(() => {
    console.log("LanguageToggle rendered. Current language:", currentLang);
    console.log("Direction:", i18n.dir());
  }, [currentLang]);

  const languages = [
    {
      code: "en",
      name: "English",
      flagUrl: enImgUrl,
    },
    {
      code: "he",
      name: "עברית",
      flagUrl: heImgUrl,
    },
  ];
  
  // Find current language or default to first
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];
  
  const toggleDropdown = () => {
    console.log("Toggle dropdown. Current state:", !isOpen);
    setIsOpen(!isOpen);
  };

  const switchLanguage = (code: string) => {
    console.log("Switching language from", currentLang, "to", code);
    try {
      // Force language change and update localStorage directly
      i18n.changeLanguage(code);
      localStorage.setItem("language", code);
      console.log("Language changed to:", i18n.language);
      
      // Close dropdown
      setIsOpen(false);
      
      // Force a page refresh if needed (uncomment if necessary)
      // setTimeout(() => window.location.reload(), 100);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <div className="relative text-left z-50">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-center w-full rounded-lg bg-white/20 px-3 py-2 text-sm font-medium text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="w-6 h-5 flex items-center justify-center mr-2">
          <img
            src={currentLanguage.flagUrl}
            alt={currentLanguage.name}
            className="w-6 h-5 object-cover shadow-sm"
          />
        </span>
        <span className="text-white">{currentLanguage.name}</span>
        <svg 
          className={`ml-2 h-5 w-5 text-white ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`${
                  lang.code === currentLang
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                } group flex items-center w-full px-4 py-3 text-sm transition-colors`}
                role="menuitem"
                onClick={() => switchLanguage(lang.code)}
              >
                <span className="w-6 h-5 mr-3">
                  <img
                    src={lang.flagUrl}
                    alt={lang.name}
                    className="w-6 h-5 object-cover shadow-sm"
                  />
                </span>
                {lang.name}
                {lang.code === currentLang && (
                  <span className="ml-auto">
                    <svg 
                      className="w-5 h-5 text-green-500" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
