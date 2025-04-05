import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // New state for initial auth check
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          navigate('/booking'); // Redirect to bookings if already logged in
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login(credentials);
      toast.success('Welcome, Divine Administrator');
      navigate('/booking'); // Redirect to bookings after login
    } catch (error) {
      toast.error('Sacred credentials do not match');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading screen while checking auth status
  if (checkingAuth) {
    return (
      <div className="auth-check-loading">
        <div className="spinner"></div>
        <p>Checking sacred access...</p>
      </div>
    );
  }

  return (
    <div className="admin-login-container">
      <ToastContainer position="top-center" />
      
      {/* Divine Background Elements */}
      <div className="temple-background">
        <div className="diya-light"></div>
        <div className="om-symbol">ॐ</div>
      </div>

      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="login-header">
          <h2>Temple Administration</h2>
          <p>Sacred Portal for Divine Management</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">
              <i className="icon email-icon"></i>
              Sacred Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="admin@temple.com"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="icon key-icon"></i>
              Divine Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Authenticating...
              </>
            ) : (
              'Enter Sacred Portal'
            )}
          </motion.button>
        </form>

        <div className="login-footer">
          <p>For authorized personnel only</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;