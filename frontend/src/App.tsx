import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Layout from "./components/Layout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import AdminUsers from "./pages/AdminUsers";
import Home from "./pages/Home";
import Schemas from "./pages/Schemas";
import SchemaForm from "./pages/SchemaForm";
import DynamicItems from "./pages/DynamicItems";
import DynamicItemForm from "./pages/DynamicItemForm";
import DynamicItemDetail from "./pages/DynamicItemDetail";

const AppRoutes = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir =
      i18n.language === "he" || i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        

         <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>          
          <Route path="/schemas" element={<Schemas />} />
          <Route path="/dynamic-items/schema/:schemaId" element={<DynamicItems />} />
          <Route path="/dynamic-items/new/:schemaId" element={<DynamicItemForm />} />
          <Route path="/dynamic-items/edit/:id" element={<DynamicItemForm />} />
          <Route path="/dynamic-items/:id" element={<DynamicItemDetail />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/schemas/new" element={<SchemaForm />} />
          <Route path="/schemas/edit/:id" element={<SchemaForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
