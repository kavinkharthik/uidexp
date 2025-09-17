import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Calculator from './Calculator';
import Experiment6FormList from './Experiment6FormList'; // Adjust path if needed

const Home = ({ onNavigateToCategory, onOpenTodoList, onOpenMobileCRUD }) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const deviceRef = useRef(null);
  const [currentFeature, setCurrentFeature] = useState(0);

  const testimonials = [
    { name: "Sarah Johnson", role: "Tech Enthusiast", text: "Amazing collection of premium smartphones! The quality and service are outstanding.", rating: 5 },
    { name: "Mike Chen", role: "Business Owner", text: "Best mobile showroom I've visited. Great prices and excellent customer support.", rating: 5 },
    { name: "Emily Davis", role: "Student", text: "Found the perfect phone for my budget. Highly recommend this place!", rating: 5 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const featuredProducts = [
    { name: 'iPhone 14 Pro', price: '₹1,19,900', tag: '🔥' },
    { name: 'Samsung S23 Ultra', price: '₹1,09,999', tag: '⚡' },
    { name: 'OnePlus 12R', price: '₹39,999', tag: '⭐' },
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentFeature((p) => (p + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(t);
  }, [featuredProducts.length]);

  const handleTilt = (e) => {
    const el = deviceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((offsetX - centerX) / centerX) * 10;
    const rotateX = -((offsetY - centerY) / centerY) * 10;
    setTilt({ x: rotateX, y: rotateY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="home" id="home">
      <div className="floating-blobs" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      {/* Minimal Top Navigation */}
      <nav className="home-navigation">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="logo-icon">📱</span>
          </div>
          <div className="nav-menu">
            <button className="nav-btn" onClick={() => onNavigateToCategory('phones')}>📱 Phones</button>
            <button className="nav-btn" onClick={() => onNavigateToCategory('tablets')}>📟 Tablets</button>
            <button className="nav-btn" onClick={() => onNavigateToCategory('accessories')}>🎧 Accessories</button>
            <button className="nav-btn" onClick={() => onNavigateToCategory('all')}>🛒 All</button>
            <button className="nav-calculator-btn" onClick={() => setShowCalculator(!showCalculator)}>🧮 Calculator</button>
            <button className="nav-btn" onClick={onOpenTodoList}>📝 Todo List</button>
            <button className="nav-btn" onClick={onOpenMobileCRUD}>🗄️ Mobile CRUD</button>
          </div>
        </div>
      </nav>

      {/* Calculator Popup */}
      {showCalculator && (
        <div className="calculator-overlay" onClick={() => setShowCalculator(false)}>
          <div className="calculator-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-calculator" onClick={() => setShowCalculator(false)}>✕</button>
            <Calculator />
          </div>
        </div>
      )}

      {/* Single-screen Hero Section */}
      <div className="home-container">
        <section className="hero-section hero-full">
          <div className="hero-grid">
            <div className="hero-left">
              <h2>Premium Devices. Clear Prices.</h2>
              <p>Discover flagship smartphones, sleek tablets, and premium accessories — curated for performance and value.</p>

              <div className="feature-chips">
                <button className="chip" onClick={() => onNavigateToCategory('phones')}>📱 Smartphones</button>
                <button className="chip" onClick={() => onNavigateToCategory('tablets')}>📟 Tablets</button>
                <button className="chip" onClick={() => onNavigateToCategory('accessories')}>🎧 Accessories</button>
              </div>

              <div className="hero-buttons">
                <button className="hero-btn primary btn-shine" onClick={() => onNavigateToCategory('all')}>Start Shopping</button>
                <button className="hero-btn secondary" onClick={() => setShowCalculator(true)}>Calculate EMI</button>
              </div>

              <div className="benefits-row">
                <div className="benefit"><span>🚚</span><p>Free Delivery</p></div>
                <div className="benefit"><span>🛡️</span><p>1-Year Warranty</p></div>
                <div className="benefit"><span>↩️</span><p>Easy Returns</p></div>
                <div className="benefit"><span>🔒</span><p>Secure Payments</p></div>
              </div>

              <div className="trust-row">
                <span>⭐ 4.9/5 rating</span>
                <span>•</span>
                <span>1,000+ happy customers</span>
                <span>•</span>
                <span>24/7 support</span>
              </div>

              <div className="micro-testimonial">
                <span className="quote">“{testimonials[currentTestimonial].text}”</span>
                <span className="author">— {testimonials[currentTestimonial].name}</span>
              </div>

              <div className="brand-row" aria-label="Trusted brands">
                <span className="brand">Apple</span>
                <span className="brand">Samsung</span>
                <span className="brand">OnePlus</span>
                <span className="brand">Xiaomi</span>
                <span className="brand">Realme</span>
              </div>

              <div className="highlights-cards">
                <div className="highlight-card hc1">
                  <span>🔁</span>
                  <div>
                    <h5>Exchange Offers</h5>
                    <p>Upgrade and save more</p>
                  </div>
                </div>
                <div className="highlight-card hc2">
                  <span>💳</span>
                  <div>
                    <h5>No Cost EMI</h5>
                    <p>0% interest plans</p>
                  </div>
                </div>
                <div className="highlight-card hc3">
                  <span>🏪</span>
                  <div>
                    <h5>Authorized Store</h5>
                    <p>100% genuine products</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div
                className="device-card"
                ref={deviceRef}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{ '--rx': `${tilt.x}deg`, '--ry': `${tilt.y}deg` }}
              >
                <div className="device-glow" />
                <div className="device-body">
                  <div className="device-notch" />
                  <div className="device-screen">
                    <div className="screen-gradient" />
                    <div className="screen-badges">
                      <span className="badge">₹19K+</span>
                      <span className="badge">20+ Models</span>
                    </div>
                    <div className="screen-carousel">
                      <div className="feature-item">
                        <div className="feature-tag">{featuredProducts[currentFeature].tag}</div>
                        <div className="feature-name">{featuredProducts[currentFeature].name}</div>
                        <div className="feature-price">{featuredProducts[currentFeature].price}</div>
                      </div>
                      <div className="feature-dots">
                        {featuredProducts.map((_, i) => (
                          <span key={i} className={`fdot ${i === currentFeature ? 'active' : ''}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="offer-badge">Festival Offer: Up to 30% OFF</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;
