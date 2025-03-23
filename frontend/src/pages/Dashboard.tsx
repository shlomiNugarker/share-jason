import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Layers, Globe2, Database, ArrowRight, BarChart3 } from "lucide-react";

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  to, 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  to: string; 
  delay?: number; 
}) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut", 
        delay 
      }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 inline-flex rounded-lg bg-purple-100/50 p-3 text-purple-600">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-4 text-gray-500">{description}</p>
      <Link to={to}>
        <Button variant="light" className="group mt-2 flex items-center gap-1">
          המשך
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
      <div className="absolute -bottom-1 -right-1 h-16 w-16 rounded-full bg-gradient-to-r from-purple-50 to-teal-50 opacity-20"></div>
    </motion.div>
  );
};

export default function Dashboard() {
  const { user } = useAuth();

  const features = [
    {
      icon: <Globe2 className="h-6 w-6" />,
      title: "אתרים מארחים",
      description: "צפייה וניהול אתרים מארחים לשיתוף המידע",
      to: "/butterfly-hosts",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "שאלות ותשובות",
      description: "גישה ועדכון של שאלות ותשובות לאפליקציית המשתמש",
      to: "/qa",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "ניהול מסמכים",
      description: "ניהול מסמכים ותוכן למערכת המידע",
      to: "/documents",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "סטטיסטיקות",
      description: "צפייה בנתונים וסטטיסטיקות על פעילות המערכת",
      to: "/stats",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold mb-4 text-gradient">ברוך הבא, {user?.name}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          מערכת ניהול התוכן מספקת גישה קלה ונוחה לכל הכלים הדרושים לניהול ושיתוף המידע
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            to={feature.to}
            delay={index * 0.1}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 rounded-xl border border-purple-100 bg-purple-50/50 p-6 text-center shadow-sm"
      >
        <h2 className="mb-2 text-xl font-semibold text-purple-700">צריך עזרה?</h2>
        <p className="text-purple-600">
          אם אתה נתקל בבעיות או צריך עזרה, אל תהסס ליצור קשר עם צוות התמיכה
        </p>
        <Button variant="gradient" className="mt-4">
          פנייה לתמיכה
        </Button>
      </motion.div>
    </div>
  );
}
