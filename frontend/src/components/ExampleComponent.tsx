import React from 'react';
import { useTranslation } from 'react-i18next';

export const ExampleComponent: React.FC = () => {
  // שימוש ב-useTranslation עם מערכי namespaces
  // זה יטען את common וגם את butterfly אם הם עוד לא נטענו
  const { t, i18n } = useTranslation(['common', 'butterfly']);
  
  // שימוש בערכים ממבנה מדורג
  const appName = t('app.name');
  const welcomeMessage = t('app.welcome');
  
  // שימוש בערכים מ-namespace ספציפי
  const butterflyTitle = t('title', { ns: 'butterfly' });
  const butterflyDescription = t('description', { ns: 'butterfly' });
  
  // הוספת משתנים בתרגום (interpolation)
  const currentTime = new Date().toLocaleTimeString(i18n.language);
  // שים לב שבמקרה אמיתי יש להוסיף את המפתח לקובץ התרגום,
  // כאן אנחנו משתמשים בטקסט חלופי כי המפתח לא קיים בקבצים
  const dynamicMessage = `Current time: ${currentTime}`;
  
  // שימוש במערך קומפקטי למפתחות תרגום
  const labels = {
    save: t('actions.save'),
    cancel: t('actions.cancel'),
    delete: t('actions.delete')
  };
  
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{appName}</h1>
      <p className="mb-4">{welcomeMessage}</p>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold">{butterflyTitle}</h2>
        <p>{butterflyDescription}</p>
      </div>
      
      <div className="mt-4">
        <p>{dynamicMessage}</p>
      </div>
      
      <div className="mt-6 flex gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          {labels.save}
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded">
          {labels.cancel}
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">
          {labels.delete}
        </button>
      </div>
    </div>
  );
}; 