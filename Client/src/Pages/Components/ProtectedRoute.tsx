import { useContext} from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Content/AuthContent';

interface ProtectedRouteProps {
  children: ReactNode;
  role: string;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const context = useContext(AuthContext);
  if (!context || !context.user) return <Navigate to={`/${role}/login`} />;
  const { user } = context;
  if (user.role !== role) return <Navigate to={`/${user.role}/dashboard`} />;
  return children;
};

export default ProtectedRoute;
