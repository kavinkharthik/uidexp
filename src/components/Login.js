import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // Clear previous errors
    setError('');
    clearError();

    // Attempt login
    const result = await login({ username, password });

    if (!result.success) {
      setError(result.error);
    }
    // If successful, the AuthContext will handle the state update
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <p>Welcome back! Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account?</p>
          <button onClick={onSwitchToRegister} className="switch-btn">
            Register here
          </button>
          <div className="demo-credentials">
            <p>Demo Credentials:</p>
            <p>Username: admin | Password: 123456</p>
            <p><small>Or create a new account to get started!</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 