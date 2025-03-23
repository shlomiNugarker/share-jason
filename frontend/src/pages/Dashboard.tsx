import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Database,
  Users,
  BarChart2,
  ArrowRight,
} from "lucide-react";

const Card = ({
  title,
  description,
  icon,
  link,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}) => {
  return (
    <Link
      to={link}
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-indigo-600 font-medium">
          <span className="mr-2">More</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const features = [
    {
      title: t("butterfly_hosts"),
      description: t("butterfly_hosts_desc"),
      icon: <Database size={24} />,
      link: "/butterfly-hosts",
    },
    // {
    //   title: t("items"),
    //   description: t("items_desc"),
    //   icon: <FileText size={24} />,
    //   link: "/items",
    // },
    {
      title: t("user_management"),
      description: t("user_management_desc"),
      icon: <Users size={24} />,
      link: "/admin/users",
    },
    {
      title: t("statistics"),
      description: t("statistics_desc"),
      icon: <BarChart2 size={24} />,
      link: "/dashboard",
      // link: "/statistics",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {t("welcome")}, {user?.name}
        </h1>
        <p className="text-purple-100 mb-0">
          {t("dashboard_description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            link={feature.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
