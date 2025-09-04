import React from "react";
import { FiMenu } from "react-icons/fi";
export default function HeaderAdmin({ menuOpen, setMenuOpen }) {
  return (
    <div>
      <header className="bg-blue-800 text-white px-6 py-4 shadow-md flex justify-between items-center relative">
        <div className="text-xl font-bold">Admin</div>

        <nav className="hidden md:flex gap-6">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Services
          </a>
          <a href="#" className="hover:underline">
            Modificar Perfil
          </a>
          <a href="#" className="hover:underline">
            Log Out
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-blue-800 text-white font-bold text-3xl px-3 py-1 rounded-lg shadow hover:bg-gray-200"
        >
          <FiMenu />
        </button>

        {menuOpen && (
          <div className="absolute top-16 right-6 bg-[#ffffff] text-black shadow-lg flex flex-col items-start p-4 gap-4 md:hidden">
            <a href="#" className="hover:bg-gray-200">
              Home
            </a>
            <a href="#" className="hover:bg-gray-200">
              Services
            </a>
            <a href="#" className="hover:bg-gray-200">
              Modificar Perfil
            </a>
            <a href="#" className="hover:bg-gray-200">
              Log Out
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
