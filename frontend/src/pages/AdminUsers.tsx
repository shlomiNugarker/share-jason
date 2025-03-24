import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { httpService } from "@/services/http.service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await httpService.del(`/api/users/${userId}`, true);
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t("admin.user_management", "ניהול משתמשים")}</h1>

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">{t("common.name", "שם")}</th>
            <th className="border p-2">{t("common.email", "דוא״ל")}</th>
            <th className="border p-2">{t("common.role", "תפקיד")}</th>
            <th className="border p-2">{t("common.actions", "פעולות")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{t(`common.roles.${user.role}`, user.role)}</td>
              <td className="border p-2">
                {user.role !== "admin" && (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
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
  );
};

export default AdminUsers;
