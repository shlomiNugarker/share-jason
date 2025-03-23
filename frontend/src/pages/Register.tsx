import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Mail, Key, Lock, UserPlus } from "lucide-react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await register(name, email, password);
      toast.success(t("register_success"));
      window.location.href = "/login";
    } catch (err) {
      setError((err as Error)?.message || "Registration failed");
    }
  };

  const inputFields = [
    {
      type: "text",
      value: name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      placeholder: t("name"),
      icon: <User className="h-5 w-5 text-gray-400" />,
      required: true
    },
    {
      type: "email",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      placeholder: t("email"),
      icon: <Mail className="h-5 w-5 text-gray-400" />,
      required: true
    },
    {
      type: "password",
      value: password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
      placeholder: t("password"),
      icon: <Key className="h-5 w-5 text-gray-400" />,
      required: true
    },
    {
      type: "password",
      value: confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value),
      placeholder: t("confirm_password"),
      icon: <Lock className="h-5 w-5 text-gray-400" />,
      required: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="gradient-text text-4xl font-bold mb-2">{t("register_page")}</h1>
          <p className="text-gray-600">צור חשבון חדש למערכת</p>
        </motion.div>

        <motion.div
          className="bg-white p-8 rounded-2xl shadow-soft"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg text-red-700"
            >
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {inputFields.map((field, index) => (
              <motion.div 
                key={field.placeholder}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.placeholder}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {field.icon}
                  </div>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="input-enhanced pl-10 w-full"
                  />
                </div>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <button
                type="submit"
                className="w-full flex items-center justify-center gradient-bg text-white py-3 px-6 rounded-xl hover:shadow-md transition-all duration-300 font-medium text-lg"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                {t("register")}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
