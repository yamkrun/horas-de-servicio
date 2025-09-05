<<<<<<< Updated upstream
import React from "react";
=======
import { useState } from "react";
import { ServiceTable } from "../components/ServiceTable";

export default function StudentPortal() {
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
>>>>>>> Stashed changes

export default function Student() {
  return (
    <div>
      <p>Student</p>
    </div>
  );
}
