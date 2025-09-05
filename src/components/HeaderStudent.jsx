import React from "react";
import { useState } from "react";

export default function HeaderStudent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const studentName = "Juan Pérez";
  const initials = studentName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleEditProfile = () => {
    alert("Redirigiendo a editar perfil...");
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    alert("Cerrando sesión...");
    setIsDropdownOpen(false);
  };
  return (
    <div className="">
      <header className="bg-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y título */}
            <div className="flex items-center space-x-3">
              <div className="bg-white text-blue-800 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
                <img src="" alt="" />
              </div>
              <h1 className="text-xl font-bold">Portal Estudiante</h1>
            </div>

            {/* Dropdown del usuario */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-blue-700 hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-200"
              >
                {initials}
              </button>

              {/* Menú dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={handleEditProfile}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Editar Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
