import React from "react";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { logOut } from "../libs/axios/auth";

export default function Header({ menuOpen, setMenuOpen }) {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/Admin");

  const links = [
    ...(isAdmin
      ? [
          { label: "Home", href: "#" },
          { label: "Services", href: "/services" },
        ]
      : []),
    { label: "Modificar Perfil", href: "/updateprofile" },
    { label: "Cerrar sesión", href: "/", onClick: () => logOut() },
  ];

  return (
    <div>
  <header className="bg-gray-100 text-gray-800 px-6 py-8 shadow-md flex justify-between items-center relative">
        <div className="text-xl font-bold">
          {isAdmin ? "Admin" : "Estudiante"}
        </div>

        {/* Links para desktop */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:underline"
              onClick={link.onClick ? link.onClick : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Botón menú para mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-blue-800 text-white font-bold text-3xl px-3 py-1 rounded-lg shadow hover:bg-gray-200"
          aria-label="Abrir menú"
        >
          <FiMenu />
        </button>
      </header>
    </div>
  );
}
