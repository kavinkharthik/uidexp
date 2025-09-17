import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MobileCRUD.css';

const MobileEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchMobile();
  }, [id, fetchMobile]);

  const fetchMobile = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/mobiles/${id}`);
      const { brand, model, specifications, price } = response.data;
      setBrand(brand);
      setModel(model);
      setSpecifications(specifications);
      setPrice(price);
    } catch (error) {
      console.error('Error fetching mobile for edit:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMobile = { brand, model, specifications, price: parseFloat(price) };
    try {
      await axios.put(`http://localhost:3001/mobiles/${id}`, updatedMobile);
      navigate('/'); // Redirect to the list page after editing
    } catch (error) {
      console.error('Error updating mobile:', error);
    }
  };

  return (
    <div className="mobile-edit-container">
      <h2>Edit Mobile</h2>
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
        <button type="submit" className="submit-button">Update Mobile</button>
      </form>
    </div>
  );
};

export default MobileEdit;
