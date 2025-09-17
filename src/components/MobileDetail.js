import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './MobileCRUD.css';

const MobileDetail = () => {
  const { id } = useParams();
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    fetchMobile();
  }, [id, fetchMobile]);

  const fetchMobile = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/mobiles/${id}`);
      setMobile(response.data);
    } catch (error) {
      console.error('Error fetching mobile details:', error);
    }
  };

  if (!mobile) {
    return <div className="mobile-detail-container">Loading mobile details...</div>;
  }

  return (
    <div className="mobile-detail-container">
      <h2>{mobile.brand} {mobile.model}</h2>
      <p><strong>Specifications:</strong> {mobile.specifications}</p>
      <p><strong>Price:</strong> ${mobile.price}</p>
      <Link to="/" className="back-button">Back to List</Link>
    </div>
  );
};

export default MobileDetail;
