import React from "react";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";

export default function Header({ menuOpen, setMenuOpen }) {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/Admin");

  const links = [
    ...(isAdmin
      ? [
          { label: "Home", href: "#" },
          { label: "Services", href: "#" },
        ]
      : []),
    { label: "Modificar Perfil", href: "/updateprofile" },
    { label: "Cerrar sesión", href: "#" },
  ];

  return (
    <div>
      <header className="bg-blue-800 text-white px-6 py-4 shadow-md flex justify-between items-center relative">
        <div className="text-xl font-bold">
          {isAdmin ? "Admin" : "Estudiante"}
        </div>

        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="hover:underline">
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-blue-800 text-white font-bold text-3xl px-3 py-1 rounded-lg shadow hover:bg-gray-200"
        >
          <FiMenu />
        </button>

        {menuOpen && (
          <div className="absolute top-16 right-6 bg-[#ffffff] text-black shadow-lg flex flex-col items-start p-4 gap-4 md:hidden">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:bg-gray-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
