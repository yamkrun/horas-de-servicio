import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

export const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    // Si el usuario no tiene el rol requerido
    return <Navigate to="/" />;
  }

  return children;
};
