import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiUserPlus,
  FiList,
  FiLogOut,
} from "react-icons/fi";

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  // Verifica si la ruta actual coincide con el enlace
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-blue-800 text-white w-64 min-h-screen p-4 fixed lg:sticky lg:top-0 left-0 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-center">Funval</h2>
      </div>

      <nav className="space-y-2">
        {/* Dashboard */}
        <Link
          to="/admin"
          className={`flex items-center py-2.5 px-4 rounded transition ${
            isActive("/admin") ? "bg-blue-900" : "hover:bg-blue-700"
          }`}
        >
          <FiHome className="mr-3" /> Dashboard
        </Link>

        {/* Gestión de Usuarios */}
        <div className="py-1 border-t border-blue-700 my-2"></div>
        <p className="text-xs text-blue-300 px-4 py-1 uppercase font-semibold">
          Gestión de Usuarios
        </p>

        <Link
          to="/admin?section=admin"
          className={`flex items-center py-2.5 px-4 rounded transition ${
            location.search === "?section=admin"
              ? "bg-blue-900"
              : "hover:bg-blue-700"
          }`}
        >
          <FiUserCheck className="mr-3" /> Administradores
        </Link>

        <Link
          to="/admin?section=controllers"
          className={`flex items-center py-2.5 px-4 rounded transition ${
            location.search === "?section=controllers"
              ? "bg-blue-900"
              : "hover:bg-blue-700"
          }`}
        >
          <FiUsers className="mr-3" /> Controladores
        </Link>

        <Link
          to="/admin?section=recruiters"
          className={`flex items-center py-2.5 px-4 rounded transition ${
            location.search === "?section=recruiters"
              ? "bg-blue-900"
              : "hover:bg-blue-700"
          }`}
        >
          <FiUserPlus className="mr-3" /> Reclutadores
        </Link>

        <Link
          to="/admin?section=students"
          className={`flex items-center py-2.5 px-4 rounded transition ${
            location.search === "?section=students"
              ? "bg-blue-900"
              : "hover:bg-blue-700"
          }`}
        >
          <FiUsers className="mr-3" /> Estudiantes
        </Link>

        {/* Servicios */}
        <div className="py-1 border-t border-blue-700 my-2"></div>
        <p className="text-xs text-blue-300 px-4 py-1 uppercase font-semibold">
          Servicios
        </p>

        <Link
          to="/services"
          className={`flex items-center py-2.5 px-4 rounded transition ${
            isActive("/services") ? "bg-blue-900" : "hover:bg-blue-700"
          }`}
        >
          <FiList className="mr-3" /> Todos los Servicios
        </Link>

        {/* Logout */}
        <div className="py-1 border-t border-blue-700 my-2"></div>
        <button
          onClick={logout}
          className="w-full text-left flex items-center py-2.5 px-4 rounded transition hover:bg-blue-700"
        >
          <FiLogOut className="mr-3" /> Cerrar Sesión
        </button>
      </nav>
    </aside>
  );
}
