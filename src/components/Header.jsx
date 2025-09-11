import React from "react";
import { useAuth } from "../Hooks/useAuth";

export default function Header() {
  const { user } = useAuth();
  const nombreUsuario = user ? `${user?.f_name || ""} ${user?.f_lastname || ""}`.trim() || "Usuario" : "Cargando...";
  
  // Determinar el título según el rol del usuario
  const getPortalTitle = () => {
    if (!user || !user.role) return "Portal";
    
    switch (user.role.name) {
      case "Student":
        return "Portal del Estudiante";
      case "Admin":
        return "Panel de Administración";
      default:
        return "Portal";
    }
  };

  return (
    <div className="w-full">
      <header className="bg-white text-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {getPortalTitle()}
        </h1>
      </header>
    </div>
  );
}
