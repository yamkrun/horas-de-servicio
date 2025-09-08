import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* El contenido crece y llena el espacio entre header y footer */}
      <main className="flex-1 flex flex-col justify-center">
        <Outlet />
      </main>

      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-lg font-semibold">MiSitio</div>
          <div className="text-sm text-center md:text-right">
            © {new Date().getFullYear()} MiSitio. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
