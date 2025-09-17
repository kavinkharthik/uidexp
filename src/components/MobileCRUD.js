import React, { useState, useEffect } from 'react';
import './MobileCRUD.css';

const MobileCRUD = () => {
    const [mobiles, setMobiles] = useState([]);
    const [currentView, setCurrentView] = useState('list'); // list, add, edit
    const [editingMobile, setEditingMobile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        model: '',
        price: '',
        storage: '',
        ram: '',
        color: '',
        display: '',
        camera: '',
        battery: '',
        description: ''
    });

    // Load mobiles from MongoDB API
    useEffect(() => {
        fetchMobiles();
    }, []);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    const fetchMobiles = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/mobiles`);
            if (response.ok) {
                const data = await response.json();
                setMobiles(data);
            } else {
                console.error('Failed to fetch mobiles');
                // Fallback to mock data if API fails
                loadMockData();
            }
        } catch (error) {
            console.error('Error fetching mobiles:', error);
            // Fallback to mock data if API fails
            loadMockData();
        }
    };

    const loadMockData = () => {
        const mockMobiles = [
            {
                _id: '1',
                name: 'iPhone 14 Pro',
                brand: 'Apple',
                model: 'iPhone 14 Pro',
                price: '₹1,19,900',
                storage: '128GB',
                ram: '6GB',
                color: 'Deep Purple',
                display: '6.1 inch',
                camera: '48MP',
                battery: '3200mAh',
                description: 'Latest Apple flagship with Pro camera system'
            },
            {
                _id: '2',
                name: 'Samsung Galaxy S23',
                brand: 'Samsung',
                model: 'Galaxy S23',
                price: '₹89,999',
                storage: '256GB',
                ram: '8GB',
                color: 'Phantom Black',
                display: '6.1 inch',
                camera: '50MP',
                battery: '3900mAh',
                description: 'Premium Android smartphone with advanced features'
            }
        ];
        setMobiles(mockMobiles);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentView === 'add') {
                const response = await fetch(`${API_BASE_URL}/mobiles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    const newMobile = await response.json();
                    setMobiles([newMobile, ...mobiles]);
                } else {
                    // Fallback to local state if API fails
                    const newMobile = {
                        _id: Date.now().toString(),
                        ...formData
                    };
                    setMobiles([newMobile, ...mobiles]);
                }
            } else if (currentView === 'edit') {
                const response = await fetch(`${API_BASE_URL}/mobiles/${editingMobile._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (response.ok) {
                    const updatedMobile = await response.json();
                    setMobiles(mobiles.map(mobile => 
                        mobile._id === editingMobile._id ? updatedMobile : mobile
                    ));
                } else {
                    // Fallback to local state if API fails
                    setMobiles(mobiles.map(mobile => 
                        mobile._id === editingMobile._id ? { ...mobile, ...formData } : mobile
                    ));
                }
                setEditingMobile(null);
            }
            setCurrentView('list');
            resetForm();
        } catch (error) {
            console.error('Error saving mobile:', error);
            // Fallback to local state if API fails
            if (currentView === 'add') {
                const newMobile = {
                    _id: Date.now().toString(),
                    ...formData
                };
                setMobiles([newMobile, ...mobiles]);
            } else if (currentView === 'edit') {
                setMobiles(mobiles.map(mobile => 
                    mobile._id === editingMobile._id ? { ...mobile, ...formData } : mobile
                ));
                setEditingMobile(null);
            }
            setCurrentView('list');
            resetForm();
        }
    };

    const handleEdit = (mobile) => {
        setEditingMobile(mobile);
        setFormData(mobile);
        setCurrentView('edit');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this mobile?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/mobiles/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setMobiles(mobiles.filter(mobile => mobile._id !== id));
                } else {
                    // Fallback to local state if API fails
                    setMobiles(mobiles.filter(mobile => mobile._id !== id));
                }
            } catch (error) {
                console.error('Error deleting mobile:', error);
                // Fallback to local state if API fails
                setMobiles(mobiles.filter(mobile => mobile._id !== id));
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            brand: '',
            model: '',
            price: '',
            storage: '',
            ram: '',
            color: '',
            display: '',
            camera: '',
            battery: '',
            description: ''
        });
    };

    const renderMobileForm = () => (
        <div className="mobile-form-container">
            <h2>{currentView === 'add' ? 'Add New Mobile' : 'Edit Mobile'}</h2>
            <form onSubmit={handleSubmit} className="mobile-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Mobile Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Brand *</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Model *</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price *</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="e.g., ₹89,999"
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Storage</label>
                        <select name="storage" value={formData.storage} onChange={handleInputChange}>
                            <option value="">Select Storage</option>
                            <option value="64GB">64GB</option>
                            <option value="128GB">128GB</option>
                            <option value="256GB">256GB</option>
                            <option value="512GB">512GB</option>
                            <option value="1TB">1TB</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>RAM</label>
                        <select name="ram" value={formData.ram} onChange={handleInputChange}>
                            <option value="">Select RAM</option>
                            <option value="4GB">4GB</option>
                            <option value="6GB">6GB</option>
                            <option value="8GB">8GB</option>
                            <option value="12GB">12GB</option>
                            <option value="16GB">16GB</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Color</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            placeholder="e.g., Deep Purple"
                        />
                    </div>
                    <div className="form-group">
                        <label>Display Size</label>
                        <input
                            type="text"
                            name="display"
                            value={formData.display}
                            onChange={handleInputChange}
                            placeholder="e.g., 6.1 inch"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Camera</label>
                        <input
                            type="text"
                            name="camera"
                            value={formData.camera}
                            onChange={handleInputChange}
                            placeholder="e.g., 48MP"
                        />
                    </div>
                    <div className="form-group">
                        <label>Battery</label>
                        <input
                            type="text"
                            name="battery"
                            value={formData.battery}
                            onChange={handleInputChange}
                            placeholder="e.g., 3200mAh"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Enter mobile description..."
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {currentView === 'add' ? 'Add Mobile' : 'Update Mobile'}
                    </button>
                    <button type="button" onClick={() => { setCurrentView('list'); resetForm(); }} className="btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

    const renderMobileList = () => (
        <div className="mobile-list-container">
            <div className="list-header">
                <h2>Mobile Management ({mobiles.length} mobiles)</h2>
                <button onClick={() => setCurrentView('add')} className="btn-primary">
                    + Add New Mobile
                </button>
            </div>

            {mobiles.length === 0 ? (
                <div className="empty-state">
                    <p>No mobiles found. Add your first mobile!</p>
                </div>
            ) : (
                <div className="mobile-grid">
                    {mobiles.map(mobile => (
                        <div key={mobile._id} className="mobile-card">
                            <div className="mobile-header">
                                <h3>{mobile.name}</h3>
                                <span className="mobile-brand">{mobile.brand}</span>
                            </div>
                            
                            <div className="mobile-details">
                                <div className="detail-row">
                                    <span className="label">Model:</span>
                                    <span className="value">{mobile.model}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Price:</span>
                                    <span className="value price">{mobile.price}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Storage:</span>
                                    <span className="value">{mobile.storage}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">RAM:</span>
                                    <span className="value">{mobile.ram}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="label">Color:</span>
                                    <span className="value">{mobile.color}</span>
                                </div>
                                {mobile.description && (
                                    <div className="mobile-description">
                                        <p>{mobile.description}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mobile-actions">
                                <button onClick={() => handleEdit(mobile)} className="btn-edit">
                                    ✏️ Edit
                                </button>
                                <button onClick={() => handleDelete(mobile._id)} className="btn-delete">
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="mobile-crud-container">
            <div className="crud-header">
                <h1>📱 Mobile CRUD Management</h1>
                <p>Create, Read, Update, and Delete mobile phone records</p>
            </div>

            <div className="crud-navigation">
                <button 
                    className={`nav-btn ${currentView === 'list' ? 'active' : ''}`}
                    onClick={() => setCurrentView('list')}
                >
                    📋 View All
                </button>
                <button 
                    className={`nav-btn ${currentView === 'add' ? 'active' : ''}`}
                    onClick={() => setCurrentView('add')}
                >
                    ➕ Add Mobile
                </button>
            </div>

            <div className="crud-content">
                {currentView === 'list' && renderMobileList()}
                {(currentView === 'add' || currentView === 'edit') && renderMobileForm()}
            </div>
        </div>
    );
};

export default MobileCRUD;
