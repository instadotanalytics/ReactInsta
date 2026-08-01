import React, { useState, useEffect } from 'react';
import styles from './AdminLogin.module.css';
import Dashboard from './AdminDashboard/Dashboard';
import { API_BASE_URL } from '../config/api'; // apna path adjust karo

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');

  // Check JWT in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUsername');
    const expiry = localStorage.getItem('tokenExpiry');

    if (token && username && expiry) {
      if (Date.now() < parseInt(expiry)) {
        setIsLoggedIn(true);
        setLoggedUser(username);
      } else {
        localStorage.clear(); // token expired
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.trim() }));
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Both fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setLoggedUser(data.data.username);
        setIsLoggedIn(true);

        // Save token and expiry 24h later
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUsername', data.data.username);
        localStorage.setItem('tokenExpiry', expiryTime.toString());
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch {
      setError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ username: '', password: '' });
    setLoggedUser('');
    setSuccessMessage('');
    setError('');
    localStorage.clear();
  };

  if (isLoggedIn) return <Dashboard username={loggedUser} onLogout={handleLogout} />;

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <span className={styles.adminBadge}>Administrator</span>
          <h2>Welcome Back</h2>
          <p>Enter your credentials to access admin panel</p>
        </div>

        {error && <div className={styles.errorMessage}>⚠️ {error}</div>}
        {successMessage && <div className={styles.successMessage}>✅ {successMessage}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">👤 Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">🔒 Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button type="button" onClick={togglePassword}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;