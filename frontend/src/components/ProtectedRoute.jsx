import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap a page: <ProtectedRoute role="creator"><CreatorDashboard /></ProtectedRoute>
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
