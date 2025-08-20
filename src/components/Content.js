import React, { useState } from 'react';
import './Content.css';
import Calculator from './Calculator';

const Content = ({ onNavigateToCategory }) => {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <section className="content" id="home">
      {/* Simple Navigation */}
      <nav className="home-navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="logo-icon">📱</span>
            <h1>Mobile Showroom</h1>
          </div>
          
          <div className="nav-menu">
            <button 
              className="nav-btn"
              onClick={() => onNavigateToCategory('phones')}
            >
              📱 Phones
            </button>
            <button 
              className="nav-btn"
              onClick={() => onNavigateToCategory('tablets')}
            >
              📟 Tablets
            </button>
            <button 
              className="nav-btn"
              onClick={() => onNavigateToCategory('accessories')}
            >
              🎧 Accessories
            </button>
            <button 
              className="nav-btn"
              onClick={() => onNavigateToCategory('all')}
            >
              🛒 All Products
            </button>
            <button 
              className="nav-calculator-btn"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              🧮 Calculator
            </button>
          </div>
        </div>
      </nav>

      {/* Calculator Popup */}
      {showCalculator && (
        <div className="calculator-overlay" onClick={() => setShowCalculator(false)}>
          <div className="calculator-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-calculator" onClick={() => setShowCalculator(false)}>
              ✕
            </button>
            <Calculator />
          </div>
        </div>
      )}

      <div className="content-container">
        {/* Simple Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h2>Welcome to Mobile Showroom</h2>
            <p>Discover premium smartphones, tablets, and accessories</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">₹19K+</span>
                <span className="stat-label">Starting Price</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button 
                className="hero-btn primary"
                onClick={() => onNavigateToCategory('phones')}
              >
                Browse Phones
              </button>
              <button 
                className="hero-btn secondary"
                onClick={() => onNavigateToCategory('all')}
              >
                View All
              </button>
            </div>
          </div>
        </div>

        {/* Simple Features Section */}
        <div className="features-section">
          <h3>Our Categories</h3>
          <div className="features-grid">
            <div className="feature-card" onClick={() => onNavigateToCategory('phones')}>
              <div className="feature-icon">📱</div>
              <h4>Smartphones</h4>
              <p>Latest premium phones</p>
              <span className="feature-count">9+ Models</span>
            </div>
            
            <div className="feature-card" onClick={() => onNavigateToCategory('tablets')}>
              <div className="feature-icon">📟</div>
              <h4>Tablets</h4>
              <p>High-performance tablets</p>
              <span className="feature-count">5+ Models</span>
            </div>
            
            <div className="feature-card" onClick={() => onNavigateToCategory('accessories')}>
              <div className="feature-icon">🎧</div>
              <h4>Accessories</h4>
              <p>Premium accessories</p>
              <span className="feature-count">6+ Items</span>
            </div>
          </div>
        </div>

        {/* Simple Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📱</div>
              <div className="stat-number">20+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-number">1000+</div>
              <div className="stat-label">Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">4.9</div>
              <div className="stat-label">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content; 