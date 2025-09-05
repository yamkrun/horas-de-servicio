import { useState } from "react";
import { ServiceTable } from "../components/ServiceTable";

export default function StudentPortal() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const studentName = "Juan Pérez
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
    <div className="min-h-screen bg-[#f2f3f7]">
      {/* Contenido principal */}
      <h2 className="text-2xl font-bold text-gray-900 m-6">
        Bienvenido, {studentName}
      </h2>
      <main className="max-w-7xl bg-[#ffffff] mx-auto lg:rounded-md px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">Horas de Servicio</p>
        <ServiceTable />
      </main>
    </div>
  );
}
