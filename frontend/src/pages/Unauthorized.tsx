import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`flex-1 min-h-screen flex flex-col items-center justify-center p-4 ${
      isDark ? 'bg-[#0d1117] text-[#c9d1d9]' : 'bg-gray-50'
    }`}>
      <div className={`p-8 max-w-md w-full text-center rounded-lg ${
        isDark ? 'bg-[#161b22] border border-[#30363d]' : 'bg-white shadow-lg'
      }`}>
        <div className="flex justify-center mb-4">
          <AlertTriangle className={`h-16 w-16 ${
            isDark ? 'text-[#f85149]' : 'text-red-500'
          }`} />
        </div>
        <h1 className={`text-2xl font-bold mb-4 ${
          isDark ? 'text-[#f85149]' : 'text-red-500'
        }`}>
          {t("common.unauthorized", "אין הרשאה")}
        </h1>
        <p className={`mb-6 ${
          isDark ? 'text-[#8b949e]' : 'text-gray-600'
        }`}>
          {t("common.unauthorized_message", "אין לך הרשאות מתאימות לצפות בדף זה")}
        </p>
        <Link to="/" className={`inline-flex px-4 py-2 rounded-md font-medium ${
          isDark 
            ? 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]' 
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}>
          {t("common.back_to_home", "חזרה לדף הבית")}
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
