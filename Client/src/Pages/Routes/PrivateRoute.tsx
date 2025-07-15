// utils/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Content/AuthContent';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default PrivateRoute;
