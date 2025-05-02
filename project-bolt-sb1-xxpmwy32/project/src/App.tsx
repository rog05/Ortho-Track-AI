import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import Sessions from './pages/Sessions';
import SessionStart from './pages/SessionStart';
import { useAuthStore } from './store/authStore';

// Define public and private route components
const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { status, user } = useAuthStore();
  
  if (status === 'loading') {
    return <div className="min-h-screen bg-neutral-50 flex items-center justify-center">Loading...</div>;
  }
  
  return !user ? element : <Navigate to="/dashboard" />;
};

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { status, user } = useAuthStore();
  
  if (status === 'loading') {
    return <div className="min-h-screen bg-neutral-50 flex items-center justify-center">Loading...</div>;
  }
  
  return user ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const { initialize } = useAuthStore();
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
      
      {/* Private routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/exercises" element={<PrivateRoute element={<Exercises />} />} />
      <Route path="/sessions" element={<PrivateRoute element={<Sessions />} />} />
      <Route path="/exercise/session/start" element={<PrivateRoute element={<SessionStart />} />} />
      
      {/* Redirect to dashboard if logged in, otherwise to login */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;