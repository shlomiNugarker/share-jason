import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { httpService } from "@/services/http.service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    if (!user) {
      console.log("😡 User not logged in");
      navigate("/unauthorized");
      return;
    }
    
    console.log("🔍 Current user:", user);
    
    if (user.role !== "admin") {
      console.log("😡 User is not admin");
      navigate("/unauthorized");
      return;
    }
    
    fetchUsers();
  }, [navigate, user]);

  const fetchUsers = async () => {
    try {
      // For development - use the test endpoint
      const data = await httpService.get("/api/users/test/all", false);
      // When ready for production:
      // const data = await httpService.get("/api/users", true);
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
      setError(t("admin.load_users_error", "שגיאה בטעינת משתמשים"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await httpService.del(`/api/users/${userId}`, true);
    } catch (err) {
      console.error(err);
      setError(t("admin.delete_user_error", "שגיאה במחיקת משתמש"));
    }
  };

  if (loading) return <p className={isDark ? 'text-[#c9d1d9]' : ''}>{t("common.loading", "טוען...")}</p>;
  if (error) return <p className={isDark ? 'text-[#f85149]' : 'text-red-500'}>{error}</p>;

  return (
    <div className={`container mx-auto p-6 ${isDark ? 'bg-[#0d1117] text-[#c9d1d9]' : ''}`}>
      <h1 className={`text-2xl font-bold mb-4 ${isDark ? 'text-[#c9d1d9]' : ''}`}>
        {t("admin.user_management", "ניהול משתמשים")}
      </h1>

      <div className={`overflow-x-auto ${isDark ? 'border-[#30363d] rounded-lg' : ''}`}>
        <table className={`w-full mt-4 ${
          isDark 
            ? 'border-collapse border border-[#30363d] bg-[#161b22]' 
            : 'border-collapse border border-gray-300'
        }`}>
          <thead>
            <tr className={isDark ? 'bg-[#21262d]' : 'bg-gray-200'}>
              <th className={`p-2 ${isDark ? 'border border-[#30363d] text-[#c9d1d9]' : 'border border-gray-300'}`}>
                {t("common.name", "שם")}
              </th>
              <th className={`p-2 ${isDark ? 'border border-[#30363d] text-[#c9d1d9]' : 'border border-gray-300'}`}>
                {t("common.email", "דוא״ל")}
              </th>
              <th className={`p-2 ${isDark ? 'border border-[#30363d] text-[#c9d1d9]' : 'border border-gray-300'}`}>
                {t("common.role", "תפקיד")}
              </th>
              <th className={`p-2 ${isDark ? 'border border-[#30363d] text-[#c9d1d9]' : 'border border-gray-300'}`}>
                {t("common.actions", "פעולות")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className={`text-center ${
                isDark ? 'hover:bg-[#21262d]' : 'hover:bg-gray-50'
              }`}>
                <td className={`p-2 ${isDark ? 'border border-[#30363d] text-[#c9d1d9]' : 'border border-gray-300'}`}>
                  {user.name}
                </td>
                <td className={`p-2 ${isDark ? 'border border-[#30363d] text-[#c9d1d9]' : 'border border-gray-300'}`}>
                  {user.email}
                </td>
                <td className={`p-2 ${isDark ? 'border border-[#30363d] text-[#c9d1d9]' : 'border border-gray-300'}`}>
                  {t(`common.roles.${user.role}`, user.role)}
                </td>
                <td className={`p-2 ${isDark ? 'border border-[#30363d]' : 'border border-gray-300'}`}>
                  {user.role !== "admin" && (
                    <button
                      className={`px-3 py-1 rounded ${
                        isDark 
                          ? 'bg-[#490202] text-[#f85149] hover:bg-[#5a0202] border border-[#f85149]/40' 
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      {t("common.delete", "מחק")}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
