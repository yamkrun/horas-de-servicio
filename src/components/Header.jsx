import React from "react";
import { useAuth } from "../Hooks/useAuth";

export default function Header() {
  const { user } = useAuth();
  const nombreUsuario = user ? `${user?.f_name || ""} ${user?.f_lastname || ""}`.trim() || "Usuario" : "Cargando...";

  return (
    <div className="w-full">
      <header className="bg-white text-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
        <div className="text-xl font-bold">
          {nombreUsuario}
        </div>
        {/* Eliminamos la visualización del rol */}
      </header>
    </div>
  );
}
