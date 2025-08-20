import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = ({ user, onUpdateProfile, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || '',
    email: user?.email || '',
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(editedUser);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      username: user?.username || '',
      email: user?.email || '',
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || ''
    });
    setIsEditing(false);
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
                Member since {formatJoinDate(user?.registeredAt)}
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
                  <button className="save-btn" onClick={handleSave}>
                    💾 Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    ❌ Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="info-grid">
              <div className="info-item">
                <label>Username</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span>{user?.username || 'Not provided'}</span>
                )}
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
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <span>{user?.phone || 'Not provided'}</span>
                )}
              </div>

              <div className="info-item">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={editedUser.location}
                    onChange={handleInputChange}
                    className="edit-input"
                    placeholder="Enter your location"
                  />
                ) : (
                  <span>{user?.location || 'Not provided'}</span>
                )}
              </div>

              <div className="info-item full-width">
                <label>Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleInputChange}
                    className="edit-textarea"
                    placeholder="Tell us about yourself..."
                    rows="3"
                  />
                ) : (
                  <span>{user?.bio || 'No bio provided'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="profile-stats">
            <h4>Account Statistics</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">
                  {user?.stats?.totalLogins || 0}
                </div>
                <div className="stat-label">Total Logins</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {user?.stats?.totalSessions || 0}
                </div>
                <div className="stat-label">Total Sessions</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {user?.stats?.firstLogin ? 
                    Math.floor((Date.now() - new Date(user.stats.firstLogin)) / (1000 * 60 * 60 * 24)) : 0
                  }
                </div>
                <div className="stat-label">Days Since First Login</div>
              </div>
            </div>
            
            {/* Additional Statistics */}
            {user?.stats?.lastLogin && (
              <div className="additional-stats">
                <div className="stat-detail">
                  <span className="stat-detail-label">Last Login:</span>
                  <span className="stat-detail-value">
                    {new Date(user.stats.lastLogin).toLocaleString()}
                  </span>
                </div>
                <div className="stat-detail">
                  <span className="stat-detail-label">First Login:</span>
                  <span className="stat-detail-value">
                    {new Date(user.stats.firstLogin).toLocaleString()}
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
