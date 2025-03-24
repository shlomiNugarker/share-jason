import { useTranslation } from "react-i18next";

const Unauthorized = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex items-center justify-center">
      <h1 className="text-2xl font-bold text-red-500">{t("common.unauthorized", "אין הרשאה")}</h1>
    </div>
  );
};

export default Unauthorized;
