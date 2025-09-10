import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function StudentSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  // Verifica si la ruta actual coincide con el enlace
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-blue-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Portal de Estudiante</h2>
      </div>
      
      <nav className="space-y-2">
        <Link 
          to="/student" 
          className={`block py-2.5 px-4 rounded transition ${
            isActive("/student") ? "bg-blue-900" : "hover:bg-blue-700"
          }`}
        >
          Inicio
        </Link>
        
        <Link 
          to="/student/create-service" 
          className={`block py-2.5 px-4 rounded transition ${
            isActive("/student/create-service") ? "bg-blue-900" : "hover:bg-blue-700"
          }`}
        >
          Crear Servicio
        </Link>
        
        <Link 
          to="/updateprofile" 
          className={`block py-2.5 px-4 rounded transition ${
            isActive("/updateprofile") ? "bg-blue-900" : "hover:bg-blue-700"
          }`}
        >
          Actualizar Perfil
        </Link>
        
        <div className="py-2 border-t border-blue-700 my-4"></div>
        
        <button
          onClick={logout}
          className="w-full text-left block py-2.5 px-4 rounded transition hover:bg-blue-700"
        >
          Cerrar Sesión
        </button>
      </nav>
    </aside>
  );
}
