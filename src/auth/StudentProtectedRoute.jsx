import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function StudentProtectedRoute() {
  const { user, loading } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f3f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario no es Student, redirigir a la página correspondiente a su rol
  if (user.role?.name !== 'Student') {
    if (user.role?.name === 'Admin') {
      return <Navigate to="/admin" replace />;
    }
    // Para otros roles, redirigir al login
    return <Navigate to="/login" replace />;
  }

  // Si es Student, permitir acceso
  return <Outlet />;
}
