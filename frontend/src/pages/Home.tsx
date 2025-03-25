import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight, Database, Share2, Users, Shield, Globe, Menu, X, LogOut } from "lucide-react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      title: t("home.features.sharing.title", "שיתוף קל ונוח"),
      description: t("home.features.sharing.description", "שתף את הקבצים שלך בקלות עם כל העולם, פשוט וללא מאמץ. שיתוף באמצעות לינק, הרשאות מתקדמות וגישות שונות"),
      icon: <Share2 className="h-12 w-12 text-purple-600" />
    },
    {
      title: t("home.features.schemas.title", "ניהול סכמות"),
      description: t("home.features.schemas.description", "צור וערוך סכמות JSON מובנות לנתונים שלך, שמור על מבנה אחיד, וודא תקינות הנתונים באופן אוטומטי"),
      icon: <Database className="h-12 w-12 text-teal-600" />
    },
    {
      title: t("home.features.security.title", "אבטחה ופרטיות"),
      description: t("home.features.security.description", "מערכת אבטחה חזקה המגינה על הנתונים שלך בכל עת, הצפנה מתקדמת ובקרת גישה מפורטת"),
      icon: <Shield className="h-12 w-12 text-green-600" />
    },
    {
      title: t("home.features.api.title", "API מתקדם"),
      description: t("home.features.api.description", "גישה מלאה לנתונים דרך ממשק API מתקדם, אינטגרציה פשוטה למערכות קיימות וניהול מרחוק"),
      icon: <Globe className="h-12 w-12 text-blue-600" />
    }
  ];

  const infoSection = [
    {
      title: t("home.info.what.title", "מה זה ShareJSON?"),
      content: t("home.info.what.content", "ShareJSON הוא פלטפורמה חדשנית לשיתוף ואחסון קבצי JSON. האפליקציה מאפשרת למפתחים ומנהלי מערכות לנהל, לאחסן ולשתף נתונים בפורמט JSON בצורה קלה ונוחה. עם כלים מתקדמים לעריכה, תיקוף ותצוגה של הנתונים, ShareJSON הופך את העבודה עם JSON לפשוטה מתמיד.")
    },
    {
      title: t("home.info.who.title", "למי זה מתאים?"),
      content: t("home.info.who.content", "האפליקציה מיועדת למפתחים, מנהלי מערכות, צוותי QA ולכל מי שעובד עם קבצי JSON. באמצעות הממשק הידידותי, גם משתמשים שאינם טכניים יכולים ליהנות מהיתרונות של ניהול נתונים מובנה. צוותי פיתוח יוכלו לשתף נתוני בדיקה, סכמות API ומבני נתונים בצורה פשוטה וברורה.")
    }
  ];

  const useCases = [
    {
      title: t("home.useCases.api.title", "פיתוח API"),
      content: t("home.useCases.api.content", "שמירה ושיתוף של סכמות API, דוגמאות תגובה והתאמות קונפיגורציה בין צוותי פיתוח")
    },
    {
      title: t("home.useCases.config.title", "ניהול קונפיגורציה"),
      content: t("home.useCases.config.content", "שמירה, גרסאות ושיתוף של קבצי קונפיגורציה בין סביבות פיתוח שונות")
    },
    {
      title: t("home.useCases.data.title", "ניהול נתוני בדיקות"),
      content: t("home.useCases.data.content", "אחסון ושיתוף של נתוני בדיקה בפורמט JSON לשימוש בתהליכי QA ופיתוח")
    }
  ];

  const apiFeatures = [
    t("home.api.feature1", "אינטגרציה פשוטה עם RESTful API"),
    t("home.api.feature2", "תמיכה ב-SDK לשפות תכנות מובילות"),
    t("home.api.feature3", "הרשאות גישה מתקדמות"),
    t("home.api.feature4", "תיעוד API אוטומטי ומקיף"),
    t("home.api.feature5", "ניהול גרסאות ושינויים"),
  ];

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <LanguageToggle />
          </div>
          
          <div className="md:hidden relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors text-white"
              aria-label={t("common.menu", "תפריט")}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-12 right-0 bg-white shadow-lg rounded-lg py-2 w-48"
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t("common.dashboard", "אזור אישי")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-right px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
                    >
                      {t("auth.logout", "התנתקות")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t("auth.login", "התחברות")}
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t("auth.register", "הרשמה")}
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  {t("common.dashboard", "אזור אישי")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} />
                  {t("auth.logout", "התנתקות")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  {t("auth.login", "התחברות")}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {t("auth.register", "הרשמה")}
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-teal-700 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="absolute h-48 w-48 top-10 left-10 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute h-72 w-72 bottom-10 right-10 bg-teal-500 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="lg:w-1/2">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t("app.name", "ShareJSON")}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 mt-2">
                  {t("home.hero.subtitle", "פלטפורמה חכמה לניהול ושיתוף קבצי JSON")}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t("home.hero.description", "נהל, ערוך ושתף קבצי JSON בדרך הקלה והבטוחה ביותר. עם ShareJSON, הנתונים שלך מאורגנים, מאובטחים וזמינים מכל מקום.")}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {isAuthenticated ? (
                  <Link to="/dashboard" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-500 rounded-lg font-semibold hover:shadow-lg hover:from-purple-700 hover:to-teal-600 transition duration-300 flex items-center gap-2">
                    {t("home.hero.dashboard_btn", "לאזור האישי")} <ArrowRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-500 rounded-lg font-semibold hover:shadow-lg hover:from-purple-700 hover:to-teal-600 transition duration-300">
                      {t("auth.login", "התחברות")}
                    </Link>
                    <Link to="/register" className="px-8 py-3 border-2 border-white/20 rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                      {t("auth.register", "הרשמה")}
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-teal-500/20 rounded-2xl transform rotate-3"></div>
                <div className="bg-black/80 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-2xl relative z-10">
                  <pre className="text-xs sm:text-sm md:text-base overflow-x-auto text-teal-400">
{`{
  "name": "${t("app.name", "ShareJSON")}",
  "version": "1.0.0",
  "description": "${t("home.hero.subtitle", "פלטפורמה לניהול ושיתוף קבצי JSON")}",
  "features": [
    "${t("home.features.editing", "עריכת JSON מתקדמת")}",
    "${t("home.features.sharing.short", "שיתוף קבצים")}",
    "${t("home.features.schemas.short", "סכמות מותאמות אישית")}",
    "${t("home.features.security.short", "אבטחה מתקדמת")}",
    "${t("home.features.api", "API לגישה מרחוק")}"
  ],
  "creator": "${t("home.creator", "Your Team")}",
  "license": "MIT"
}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.features.title", "הפיצ'רים שלנו")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("home.features.description", "עם ShareJSON, ניהול ושיתוף קבצי JSON הופך לפשוט ואינטואיטיבי. האפליקציה מציעה מגוון תכונות פורצות דרך לניהול נתונים יעיל ובטוח.")}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div 
              className="lg:w-1/2 space-y-8"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {infoSection.map((item, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.content}</p>
                </div>
              ))}
              
              <div className="pt-4">
                {!isAuthenticated && (
                  <Link 
                    to="/register" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-teal-600 transition duration-300"
                  >
                    {t("home.info.join_now", "הצטרף היום")} <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-purple-100 to-teal-100 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-teal-500"></div>
                <div className="mb-6 flex items-center justify-center">
                  <Users className="h-16 w-16 text-purple-700" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
                  {t("home.testimonials.title", "הצטרפו למאות המשתמשים")}
                </h3>
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                        <span className="font-bold text-purple-700">א</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{t("home.testimonials.quote1", "״שיפר את העבודה שלי באופן דרמטי״")}</p>
                        <p className="text-sm text-gray-500">{t("home.testimonials.author1", "אמיר כ. - מפתח Full Stack")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center">
                        <span className="font-bold text-teal-700">ר</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{t("home.testimonials.quote2", "״ניהול הסכמות חסך לנו המון זמן״")}</p>
                        <p className="text-sm text-gray-500">{t("home.testimonials.author2", "רונית ל. - מנהלת מוצר")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                        <span className="font-bold text-blue-700">ד</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{t("home.testimonials.quote3", "״ה-API פשוט לשימוש ומאפשר לנו גמישות רבה״")}</p>
                        <p className="text-sm text-gray-500">{t("home.testimonials.author3", "דני מ. - ארכיטקט תוכנה")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("home.useCases.title", "שימושים נפוצים")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("home.useCases.description", "גלה כיצד ShareJSON יכול לשפר את תהליכי העבודה בארגון שלך ולהפוך את ניהול הנתונים לפשוט יותר")}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {useCases.map((useCase, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("home.api.title", "API חזק ופשוט לשימוש")}
              </h2>
              <p className="text-lg text-purple-200 mb-8">
                {t("home.api.description", "גישה מלאה לנתונים שלך דרך ממשק API מתועד היטב. אפשר אינטגרציה פשוטה עם שירותים וכלים אחרים.")}
              </p>
              
              <ul className="space-y-4 mb-8">
                {apiFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-purple-500/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/docs/api" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition duration-300"
              >
                {t("home.api.documentation", "צפה בתיעוד ה-API")} <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-xs text-gray-400 ml-2">Terminal</div>
                </div>
                <pre className="text-xs sm:text-sm overflow-x-auto text-green-400">
{`$ curl -X GET "https://api.sharejson.com/v1/items/12345" \\
  -H "Authorization: Bearer YOUR_API_KEY"

{
  "id": "12345",
  "name": "config.json",
  "content": {
    "apiVersion": "v1",
    "environment": "production",
    "features": {
      "darkMode": true,
      "analytics": true
    }
  },
  "schema": "https://sharejson.com/schemas/config",
  "created_at": "2023-06-15T10:30:00Z",
  "updated_at": "2023-06-18T14:22:33Z"
}`}
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-900 to-teal-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("home.cta.title", "מוכנים להתחיל?")}</h2>
            <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto mb-8">
              {t("home.cta.description", "הצטרפו למהפכת ה-JSON ושפרו את ניהול הנתונים שלכם כבר היום. התחילו בחינם ושדרגו בהתאם לצרכים שלכם.")}
            </p>
            
            {!isAuthenticated ? (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register" className="px-8 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition duration-300">
                  {t("home.cta.register_now", "הרשמה עכשיו")}
                </Link>
                <Link to="/login" className="px-8 py-3 border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                  {t("auth.login", "התחברות")}
                </Link>
              </div>
            ) : (
              <Link to="/items" className="px-8 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-100 transition duration-300 inline-flex items-center gap-2">
                {t("home.hero.dashboard_btn", "לאזור האישי")} <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
