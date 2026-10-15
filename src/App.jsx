/**
 * AERO — Personalised AI News Aggregator
 * Author: Rao M. Zuraiz | Roll Number: SP24-BCS-111
 * COMSATS University Sahiwal Campus
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Preferences from './pages/Preferences';
import Feed from './pages/Feed';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import SiteLayout from './components/layout/SiteLayout';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <SiteLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/feed" replace />} />
    </Routes>
  );
}
