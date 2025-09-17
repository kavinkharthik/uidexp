import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = ({ onClose }) => {
  const { user, updateProfile, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      setError('');
      setSuccess('');
      
      // Only update fields that can be updated via the API
      const updateData = {
        fullName: editedUser.fullName,
        email: editedUser.email
      };

      const result = await updateProfile(updateData);
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        
        // Update local state with the new user data
        setEditedUser({
          fullName: result.user.fullName || '',
          email: result.user.email || '',
          phone: user?.phone || '',
          bio: user?.bio || '',
          location: user?.location || ''
        });
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditedUser({
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || ''
    });
    setIsEditing(false);
    setError('');
    setSuccess('');
  };

  const formatJoinDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile-overlay">
      <div className="profile-container">
        <div className="profile-header">
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
          <h2>User Profile</h2>
        </div>

        <div className="profile-content">
          {/* Avatar Section */}
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="avatar-info">
              <h3>{user?.fullName || user?.username || 'Unknown User'}</h3>
              <p className="user-status">Active Member</p>
              <p className="join-date">
                Member since {formatJoinDate(user?.createdAt)}
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <div className="info-header">
              <h4>Profile Information</h4>
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : '💾 Save'}
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div style={{ 
                color: '#e74c3c', 
                backgroundColor: '#fdf2f2', 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '15px',
                border: '1px solid #fecaca'
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{ 
                color: '#059669', 
                backgroundColor: '#f0fdf4', 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '15px',
                border: '1px solid #bbf7d0'
              }}>
                {success}
              </div>
            )}

            <div className="info-grid">
              <div className="info-item">
                <label>Username</label>
                <span>{user?.username || 'Not provided'}</span>
                <small style={{ color: '#666', fontSize: '12px' }}>Username cannot be changed</small>
              </div>

              <div className="info-item">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{user?.email || 'Not provided'}</span>
                )}
              </div>

              <div className="info-item">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={editedUser.fullName}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <span>{user?.fullName || 'Not provided'}</span>
                )}
              </div>

              <div className="info-item">
                <label>Phone</label>
                <span>{user?.phone || 'Not provided'}</span>
                <small style={{ color: '#666', fontSize: '12px' }}>Phone updates coming soon</small>
              </div>

              <div className="info-item">
                <label>Location</label>
                <span>{user?.location || 'Not provided'}</span>
                <small style={{ color: '#666', fontSize: '12px' }}>Location updates coming soon</small>
              </div>

              <div className="info-item full-width">
                <label>Bio</label>
                <span>{user?.bio || 'No bio provided'}</span>
                <small style={{ color: '#666', fontSize: '12px' }}>Bio updates coming soon</small>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="profile-stats">
            <h4>Account Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">
                  {user?.loginCount || 0}
                </div>
                <div className="stat-label">Total Logins</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {user?.role || 'user'}
                </div>
                <div className="stat-label">Role</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {user?.createdAt ? 
                    Math.floor((Date.now() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)) : 0
                  }
                </div>
                <div className="stat-label">Days Since Registration</div>
              </div>
            </div>
            
            {/* Additional Statistics */}
            {user?.lastLogin && (
              <div className="additional-stats">
                <div className="stat-detail">
                  <span className="stat-detail-label">Last Login:</span>
                  <span className="stat-detail-value">
                    {new Date(user.lastLogin).toLocaleString()}
                  </span>
                </div>
                <div className="stat-detail">
                  <span className="stat-detail-label">Account Created:</span>
                  <span className="stat-detail-value">
                    {new Date(user.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
