import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-right p-4 text-sm text-gray-600">
      <p>© {currentYear} Funval. Todos los derechos reservados.</p>
    </footer>
  );
}
