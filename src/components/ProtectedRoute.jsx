import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children }) {
  return localStorage.getItem('smc_session') ? children : <Navigate to="/login" replace />;
}
