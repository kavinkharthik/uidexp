import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [activityLog, setActivityLog] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    if (isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated]);

  const loadUserData = () => {
    // Load registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setUsers(registeredUsers);

    // Load user statistics
    const userStatsData = JSON.parse(localStorage.getItem('userStats') || '{}');
    setUserStats(userStatsData);

    // Create activity log from user stats
    const activities = [];
    Object.keys(userStatsData).forEach(username => {
      const userData = userStatsData[username];
      if (userData.loginHistory) {
        userData.loginHistory.forEach(login => {
          activities.push({
            type: 'signin',
            username: username,
            timestamp: login.timestamp,
            userAgent: login.userAgent
          });
        });
      }
    });

    // Add registration activities
    registeredUsers.forEach(user => {
      activities.push({
        type: 'register',
        username: user.username,
        timestamp: user.registeredAt || new Date().toISOString(),
        email: user.email
      });
    });

    // Sort by timestamp (newest first)
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setActivityLog(activities);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@gmail.com' && password === 'admin@123') {
      setIsAuthenticated(true);
      // Log admin login
      const adminActivity = {
        type: 'admin_login',
        username: 'admin',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };
      setActivityLog(prev => [adminActivity, ...prev]);
    } else {
      setError('Invalid credentials. Use admin@gmail.com / admin@123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'register': return '👤';
      case 'signin': return '🔑';
      case 'admin_login': return '👨‍💼';
      default: return '📝';
    }
  };

  const getActivityText = (activity) => {
    switch (activity.type) {
      case 'register':
        return `${activity.username} registered with email ${activity.email}`;
      case 'signin':
        return `${activity.username} signed in`;
      case 'admin_login':
        return 'Admin logged in';
      default:
        return 'Unknown activity';
    }
  };

  const getTotalUsers = () => {
    return users.length;
  };

  const getTotalLogins = () => {
    return Object.values(userStats).reduce((total, user) => total + (user.totalLogins || 0), 0);
  };

  const getRecentActivity = () => {
    return activityLog.slice(0, 10);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-overlay">
        <div className="admin-login-modal">
          <div className="admin-login-header">
            <h2>👨‍💼 Admin Panel</h2>
            <button className="close-admin" onClick={onClose}>✕</button>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin@123"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="admin-login-btn">
              🔑 Sign In
            </button>
          </form>
          
          <div className="admin-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: admin@gmail.com</p>
            <p>Password: admin@123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <div className="admin-title">
            <h2>👨‍💼 Admin Dashboard</h2>
            <span className="admin-status">● Online</span>
          </div>
          <div className="admin-actions">
            <button 
              className={`admin-nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`admin-nav-btn ${currentView === 'users' ? 'active' : ''}`}
              onClick={() => setCurrentView('users')}
            >
              👥 Users
            </button>
            <button 
              className={`admin-nav-btn ${currentView === 'activity' ? 'active' : ''}`}
              onClick={() => setCurrentView('activity')}
            >
              📝 Activity Log
            </button>
            <button className="admin-logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
            <button className="close-admin" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="admin-content">
          {currentView === 'dashboard' && (
            <div className="dashboard-view">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>{getTotalUsers()}</h3>
                    <p>Total Users</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔑</div>
                  <div className="stat-info">
                    <h3>{getTotalLogins()}</h3>
                    <p>Total Logins</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📱</div>
                  <div className="stat-info">
                    <h3>20</h3>
                    <p>Products</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-info">
                    <h3>4.9</h3>
                    <p>Rating</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>📝 Recent Activity</h3>
                <div className="activity-list">
                  {getRecentActivity().map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="activity-details">
                        <p className="activity-text">{getActivityText(activity)}</p>
                        <span className="activity-time">{formatDate(activity.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'users' && (
            <div className="users-view">
              <h3>👥 Registered Users</h3>
              <div className="users-table">
                <div className="table-header">
                  <div className="table-cell">Username</div>
                  <div className="table-cell">Email</div>
                  <div className="table-cell">Registered</div>
                  <div className="table-cell">Logins</div>
                  <div className="table-cell">Last Login</div>
                </div>
                {users.map((user, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell">{user.username}</div>
                    <div className="table-cell">{user.email}</div>
                    <div className="table-cell">{formatDate(user.registeredAt)}</div>
                    <div className="table-cell">{userStats[user.username]?.totalLogins || 0}</div>
                    <div className="table-cell">
                      {userStats[user.username]?.lastLogin ? 
                        formatDate(userStats[user.username].lastLogin) : 'Never'
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'activity' && (
            <div className="activity-view">
              <h3>📝 Activity Log</h3>
              <div className="activity-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Registrations</button>
                <button className="filter-btn">Sign-ins</button>
              </div>
              <div className="activity-log">
                {activityLog.map((activity, index) => (
                  <div key={index} className="log-item">
                    <div className="log-icon">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="log-content">
                      <div className="log-header">
                        <span className="log-type">{activity.type.toUpperCase()}</span>
                        <span className="log-time">{formatDate(activity.timestamp)}</span>
                      </div>
                      <p className="log-description">{getActivityText(activity)}</p>
                      {activity.userAgent && (
                        <small className="log-useragent">{activity.userAgent}</small>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 