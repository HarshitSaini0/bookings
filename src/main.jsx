import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import BookingDashboard from './pages/BookingDashboard';
import BookingForm from './pages/TempleBookingForm';
import Login from './pages/AdminLogin';
import NotFound from './pages/NotFound';
import authService from './appwrite/auth';
import HomePage from './pages/HomePage';

const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState({
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setAuthStatus({
          loading: false,
          isAuthenticated: !!user,
        });
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthStatus({
          loading: false,
          isAuthenticated: false,
        });
      }
    };
    checkAuth();
  }, []);

  if (authStatus.loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Verifying sacred access...</p>
      </div>
    );
  }

  return authStatus.isAuthenticated ? children : <Navigate to="/login" replace />;
};

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/booking" 
          element={
            <ProtectedRoute>
              <BookingDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/booking-form" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>
);