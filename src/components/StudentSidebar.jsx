import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { FiHome, FiPlusCircle, FiUser, FiLogOut } from "react-icons/fi";

export default function StudentSidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  // Verifica si la ruta actual coincide con el enlace
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-blue-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold border-b border-blue-700 pb-4">Portal de Estudiante</h2>
        {user && (
          <div className="mt-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-600 mx-auto flex items-center justify-center">
              <span className="text-2xl font-bold">
                {user.f_name && user.f_name[0]}{user.f_lastname && user.f_lastname[0]}
              </span>
            </div>
            <p className="mt-2 font-medium">{user.f_name} {user.f_lastname}</p>
            <p className="text-sm text-blue-300">{user.email}</p>
          </div>
        )}
      </div>
      
      <nav className="space-y-2">
        <Link 
          to="/student" 
          className={`flex items-center py-2.5 px-4 rounded transition ${
            isActive("/student") ? "bg-blue-900" : "hover:bg-blue-700"
          }`}
        >
          <FiHome className="mr-3" />
          Inicio
        </Link>
        
        <Link 
          to="/student/create-service" 
          className={`flex items-center py-2.5 px-4 rounded transition ${
            isActive("/student/create-service") ? "bg-blue-900" : "hover:bg-blue-700"
          }`}
        >
          <FiPlusCircle className="mr-3" />
          Crear Servicio
        </Link>
        
        <Link 
          to="/updateprofile" 
          className={`flex items-center py-2.5 px-4 rounded transition ${
            isActive("/updateprofile") ? "bg-blue-900" : "hover:bg-blue-700"
          }`}
        >
          <FiUser className="mr-3" />
          Actualizar Perfil
        </Link>
        
        <div className="py-2 border-t border-blue-700 my-4"></div>
        
        <button
          onClick={logout}
          className="w-full flex items-center text-left py-2.5 px-4 rounded transition hover:bg-blue-700"
        >
          <FiLogOut className="mr-3" />
          Cerrar Sesión
        </button>
      </nav>
    </aside>
  );
}
