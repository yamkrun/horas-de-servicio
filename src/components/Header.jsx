import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function Header({ menuOpen, setMenuOpen }) {
  const { user } = useAuth();
  const nombreUsuario = user ? `${user?.f_name || ""} ${user?.f_lastname || ""}`.trim() || "Usuario" : "Cargando...";

  return (
    <div>
      <header className="bg-gray-100 text-gray-800 px-6 py-8 shadow-md flex justify-between items-center relative">
        <div className="text-xl font-bold">
          {nombreUsuario}
        </div>
        
      </header>
    </div>
  );
}
