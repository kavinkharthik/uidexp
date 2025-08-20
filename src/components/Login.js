import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // Simple validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check registered users first
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => 
      (u.username === username || u.email === username) && u.password === password
    );

    if (user) {
      onLogin(user.username);
      setError('');
      return;
    }

    // Fallback to demo credentials
    if (username === 'admin' && password === '123456') {
      onLogin(username);
      setError('');
      return;
    }

    setError('Invalid username/email or password');
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

          <button type="submit" className="login-btn">
            Login
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 