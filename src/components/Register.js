import React, { useState } from 'react';
import './Register.css';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return false;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if user already exists (simple check using localStorage)
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.some(user => 
      user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      setError('Username or email already exists');
      return;
    }

    // Save user to localStorage
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password, // In a real app, this should be hashed
      registeredAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    setSuccess('Registration successful! You can now login.');
    setError('');
    
    // Call the onRegister callback if provided
    if (onRegister) {
      onRegister(newUser);
    }

    // Clear form
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    // Auto-switch to login after 2 seconds
    setTimeout(() => {
      onSwitchToLogin();
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>📱 MobileShowroom</h2>
          <p>Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account?</p>
          <button onClick={onSwitchToLogin} className="switch-btn">
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
