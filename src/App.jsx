import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => setShowProductList(true);
  const handleHomeClick = () => setShowProductList(false);

  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">🌱 Paradise Nursery</div>
        <nav className="nav-links">
          <button onClick={handleHomeClick}>Home</button>
          <a href="#about">About</a>
          <button onClick={handleGetStartedClick}>Shop</button>
        </nav>
      </header>

      {/* Landing Section */}
      {!showProductList && (
        <section className="landing-page">
          <div className="background-image"></div>
          <div className="landing-content">
            <h1 className="title">Welcome To Paradise Nursery</h1>
            <p className="tagline">Where Green Meets Serenity 🌿</p>
            <button
              className="cta-button"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </div>
          <div id="about" className="about-section">
            <AboutUs />
          </div>
        </section>
      )}

      {/* Product List */}
      {showProductList && (
        <div className="product-list-container">
          <ProductList onHomeClick={handleHomeClick} />
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Paradise Nursery. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
