import React, { useState, useMemo } from 'react';
import './List.css';
import BillingCalculator from './BillingCalculator';

const List = ({ selectedCategory, onGoHome }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showBillingCalculator, setShowBillingCalculator] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const products = [
    { id: 1, name: 'iPhone 15 Pro', price: '₹99,999', description: 'Latest iPhone with A17 Pro chip and titanium design.', category: 'phones' },
    { id: 2, name: 'Samsung Galaxy S24', price: '₹1,09,999', description: 'Premium Android flagship with S Pen and AI features.', category: 'phones' },
    { id: 3, name: 'AirPods Pro', price: '₹19,999', description: 'Active noise cancellation and spatial audio.', category: 'accessories' },
    { id: 4, name: 'iPad Pro 12.9"', price: '₹89,999', description: 'Most powerful iPad with M2 chip and Apple Pencil support.', category: 'tablets' },
    { id: 5, name: 'OnePlus 12', price: '₹69,999', description: 'Fast charging and Hasselblad camera system.', category: 'phones' },
    { id: 6, name: 'Google Pixel 8 Pro', price: '₹84,999', description: 'Best camera phone with AI features.', category: 'phones' },
    { id: 7, name: 'Samsung Galaxy Tab S9', price: '₹74,999', description: 'Premium Android tablet with S Pen.', category: 'tablets' },
    { id: 8, name: 'MacBook Air M2', price: '₹1,24,999', description: 'Ultra-thin laptop with M2 chip.', category: 'accessories' },
    { id: 9, name: 'Sony WH-1000XM5', price: '₹29,999', description: 'Industry-leading noise cancellation headphones.', category: 'accessories' },
    { id: 10, name: 'Apple Watch Series 9', price: '₹41,999', description: 'Advanced health monitoring and fitness tracking.', category: 'accessories' },
    { id: 11, name: 'Xiaomi 14 Ultra', price: '₹79,999', description: 'Professional photography with Leica optics.', category: 'phones' },
    { id: 12, name: 'Nothing Phone 2', price: '₹44,999', description: 'Unique Glyph interface and clean Android.', category: 'phones' },
    { id: 13, name: 'iPad Air 5th Gen', price: '₹54,999', description: 'Perfect balance of power and portability.', category: 'tablets' },
    { id: 14, name: 'Samsung Galaxy Z Fold 5', price: '₹1,54,999', description: 'Foldable smartphone with S Pen support.', category: 'phones' },
    { id: 15, name: 'Apple AirPods Max', price: '₹59,999', description: 'Premium over-ear headphones with spatial audio.', category: 'accessories' },
    { id: 16, name: 'Microsoft Surface Pro 9', price: '₹1,34,999', description: '2-in-1 laptop and tablet with Windows 11.', category: 'tablets' },
    { id: 17, name: 'Oppo Find X7 Ultra', price: '₹89,999', description: 'Innovative camera system with Hasselblad.', category: 'phones' },
    { id: 18, name: 'Vivo X100 Pro', price: '₹84,999', description: 'Professional photography with Zeiss optics.', category: 'phones' },
    { id: 19, name: 'Lenovo Tab P12 Pro', price: '₹64,999', description: 'Android tablet with premium display.', category: 'tablets' },
    { id: 20, name: 'Bose QuietComfort 45', price: '₹24,999', description: 'Comfortable noise-cancelling headphones.', category: 'accessories' }
  ];

  const parsePrice = (p) => parseInt(p.replace(/[^\d]/g, ''));

  const filtered = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const display = useMemo(() => {
    let list = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price_low') list = list.slice().sort((a,b)=>parsePrice(a.price)-parsePrice(b.price));
    if (sortBy === 'price_high') list = list.slice().sort((a,b)=>parsePrice(b.price)-parsePrice(a.price));
    if (sortBy === 'name') list = list.slice().sort((a,b)=>a.name.localeCompare(b.name));
    return list;
  }, [filtered, search, sortBy]);

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id);
    if (existing) setCart(cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    else setCart([...cart, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));
  const updateQuantity = (id, q) => { if (q <= 0) return removeFromCart(id); setCart(cart.map(i => i.id === id ? { ...i, quantity: q } : i)); };
  const itemSubtotal = (i) => parsePrice(i.price) * i.quantity;
  const totalItems = () => cart.reduce((s,i)=>s+i.quantity,0);
  const totalPrice = () => cart.reduce((s,i)=>s+parsePrice(i.price)*i.quantity,0);

  // Store name + readable category label
  const storeName = 'Mobile Accessory';
  const categoryLabel =
    selectedCategory === 'phones' ? 'Smartphones' :
    selectedCategory === 'tablets' ? 'Tablets' :
    selectedCategory === 'accessories' ? 'Accessories' : 'All Products';

  const iconFor = (c) => c === 'phones' ? '📱' : c === 'tablets' ? '📟' : '🎧';

  const ProductCard = ({ product }) => (
    <div className="product-card modern">
      <div className="card-top">
        <div className={`thumb ${product.category}`}>{iconFor(product.category)}</div>
        <span className="chip">{product.category.toUpperCase()}</span>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="card-footer">
          <span className="price-tag">{product.price}</span>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="products" className={`list-section ${selectedCategory}`}>
      <div className="list-container">
        <div className="list-header">
          <h2 className="store-title">🛍️ {storeName}</h2>
          <p className="store-sub">Explore our premium devices — {categoryLabel}</p>

          {selectedCategory === 'all' && (
            <div className="list-hero">
              <div className="hero-copy">
                <h3>Premium Devices. Clear Prices.</h3>
                <p>Curated smartphones, tablets and accessories — compare, sort and add to cart instantly.</p>
              </div>
              <div className="hero-stats">
                <div><strong>20+</strong><span>Products</span></div>
                <div><strong>₹19K+</strong><span>Starting</span></div>
                <div><strong>Top</strong><span>Brands</span></div>
              </div>
            </div>
          )}

          <div className="filters-bar">
            <input className="search-input" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search products..." />
            <select className="sort-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
              <option value="popular">Sort: Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="name">Name: A → Z</option>
            </select>
            <button className="cart-toggle-btn" onClick={()=>setShowCart(!showCart)}>🛒 Cart ({totalItems()} items)</button>
          </div>
        </div>


        {showCart && (
          <div className="cart-section">
            <h3>🛒 Shopping Cart</h3>
            {cart.length === 0 ? <p>Your cart is empty</p> : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-price">{item.price} each</p>
                      </div>
                      <div className="quantity-controls">
                        <button className="quantity-btn" onClick={()=>updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="quantity">{item.quantity}</span>
                        <button className="quantity-btn" onClick={()=>updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="item-subtotal">
                        <span>₹{itemSubtotal(item).toLocaleString()}</span>
                        <button className="remove-btn" onClick={()=>removeFromCart(item.id)} title="Remove item">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="summary-row"><span>Items ({totalItems()}):</span><span>₹{totalPrice().toLocaleString()}</span></div>
                  <div className="summary-row total-row"><strong>Total: ₹{totalPrice().toLocaleString()}</strong></div>
                </div>
                <div className="cart-actions">
                  <button className="billing-calc-btn" onClick={()=>setShowBillingCalculator(!showBillingCalculator)}>🧮 Billing Calculator</button>
                  <button className="checkout-btn">Checkout</button>
                </div>
                {showBillingCalculator && (
                  <div className="billing-calculator-section">
                    <BillingCalculator cart={cart} />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        <div className="products-grid">
          {display.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

export default List;