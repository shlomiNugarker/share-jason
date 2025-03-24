import { useState } from "react";
import { useTranslation } from "react-i18next";
import enImgUrl from "../assets/en.png";
import heImgUrl from "../assets/he.png";

interface Language {
  code: string;
  name: string;
  flagUrl: string;
}

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = i18n.language;
  
  // Languages configuration
  const languages: Language[] = [
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
  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[1];
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Switch language
  const switchLanguage = (code: string) => {
    if (code === currentLang) {
      setIsOpen(false);
      return;
    }
    
    try {
      i18n.changeLanguage(code);
      setIsOpen(false);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={currentLanguage.flagUrl}
          alt={currentLanguage.name}
          className="w-5 h-5 rounded-sm"
        />
        <span className="text-sm font-medium hidden md:inline">
          {currentLanguage.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`flex items-center gap-2 w-full px-3 py-2 text-left text-sm ${
                language.code === currentLang
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => switchLanguage(language.code)}
            >
              <img
                src={language.flagUrl}
                alt={language.name}
                className="w-5 h-5 rounded-sm"
              />
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
