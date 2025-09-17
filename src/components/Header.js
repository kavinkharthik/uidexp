import React from 'react';
import './Header.css';

const Header = ({ username, onLogout, onOpenProfile, onGoHome, currentPage, onOpenAdmin, onOpenContact }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          {currentPage !== 'home' && (
            <button className="home-btn" onClick={onGoHome}>
              🏠 Home
            </button>
          )}
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <span className="username">Welcome, {username}!</span>
            <button className="profile-btn" onClick={onOpenProfile}>
              👤 Profile
            </button>
            <button className="admin-btn" onClick={onOpenAdmin}>
              👨‍💼 Admin
            </button>
            <button className="logout-btn" onClick={onLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 