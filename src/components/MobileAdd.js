import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MobileCRUD.css';

const MobileAdd = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMobile = { brand, model, specifications, price: parseFloat(price) };
    try {
      await axios.post('http://localhost:3001/mobiles', newMobile);
      navigate('/'); // Redirect to the list page after adding
    } catch (error) {
      console.error('Error adding mobile:', error);
    }
  };

  return (
    <div className="mobile-add-container">
      <h2>Add New Mobile</h2>
      <form onSubmit={handleSubmit} className="mobile-form">
        <div className="form-group">
          <label>Brand:</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Model:</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Specifications:</label>
          <input type="text" value={specifications} onChange={(e) => setSpecifications(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Add Mobile</button>
      </form>
    </div>
  );
};

export default MobileAdd;
