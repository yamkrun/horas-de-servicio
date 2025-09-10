import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function AdminProtectedRoute() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AdminProtectedRoute - User:", user);
    console.log("AdminProtectedRoute - Loading:", loading);
  }, [user, loading]);

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
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Si el usuario no es Admin, redirigir a la página correspondiente a su rol
  if (user.role?.name !== 'Admin') {
    console.log("User is not Admin, redirecting based on role:", user.role?.name);
    if (user.role?.name === 'Student') {
      return <Navigate to="/student" replace />;
    }
    // Para otros roles, redirigir al login
    return <Navigate to="/login" replace />;
  }

  console.log("User is Admin, allowing access");
  // Si es Admin, permitir acceso
  return <Outlet />;
}
