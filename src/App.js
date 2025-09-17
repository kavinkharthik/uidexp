import React, { useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import Header from './components/Header';
import Home from './components/Home';
import List from './components/List';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import AdminPanel from './components/AdminPanel';
import AddItemForm from './components/AddItemForm';
import TodoList from './components/TodoList';
import MobileCRUD from './components/MobileCRUD';

function Contact() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
      <h2>📞 Contact Us</h2>
      <p style={{ marginBottom: '20px' }}>
        We’d love to hear from you! Reach us via any of the options below:
      </p>

      <div style={cardStyle}>
        <h3>📍 Address</h3>
        <p>Mobile Showroom Pvt Ltd<br />123, Main Street, Perundurai, Tamil Nadu</p>
      </div>

      <div style={cardStyle}>
        <h3>📞 Phone</h3>
        <p>+91 98765 43210</p>
      </div>

      <div style={cardStyle}>
        <h3>📧 Email</h3>
        <p>support@mobileshowroom.com</p>
      </div>

      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
        width="100%"
        height="250"
        style={{ border: 0, marginTop: '15px', borderRadius: '10px' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

const cardStyle = {
  background: '#f9f9f9',
  borderRadius: '10px',
  padding: '15px',
  margin: '15px 0',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    let userData = registeredUsers.find(u => u.username === user || u.email === user);

    const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');
    const userKey = userData ? userData.username : user;

    if (!userStats[userKey]) {
      userStats[userKey] = {
        totalLogins: 0,
        totalSessions: 0,
        firstLogin: new Date().toISOString(),
        lastLogin: null,
        loginHistory: []
      };
    }

    userStats[userKey].totalLogins += 1;
    userStats[userKey].totalSessions += 1;
    userStats[userKey].lastLogin = new Date().toISOString();
    userStats[userKey].loginHistory.push({
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });

    if (userStats[userKey].loginHistory.length > 10) {
      userStats[userKey].loginHistory = userStats[userKey].loginHistory.slice(-10);
    }

    localStorage.setItem('userStats', JSON.stringify(userStats));

    if (userData) {
      userData.stats = userStats[userKey];
      setCurrentUser(userData);
    } else {
      setCurrentUser({
        username: user,
        email: user === 'admin' ? 'admin@mobileshowroom.com' : `${user}@example.com`,
        fullName: user === 'admin' ? 'Administrator' : user,
        registeredAt: userStats[userKey].firstLogin,
        stats: userStats[userKey]
      });
    }
  };

  const handleLogout = () => {
    setUsername('');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setShowProfile(false);
    setShowAdminPanel(false);
    setCurrentPage('home');
    setSelectedCategory('all');
  };

  const handleOpenProfile = () => {
    setShowProfile(true);
    setShowAdminPanel(false);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleOpenAdmin = () => {
    setShowAdminPanel(true);
    setShowProfile(false);
  };

  const handleCloseAdmin = () => {
    setShowAdminPanel(false);
  };

  const handleUpdateProfile = (updatedUser) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userIndex = registeredUsers.findIndex(u => u.username === currentUser.username);

    if (userIndex !== -1) {
      registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...updatedUser };
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }

    setCurrentUser({ ...currentUser, ...updatedUser });
    setUsername(updatedUser.username);
  };

  const handleNavigateToCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage('products');
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    setSelectedCategory('all');
  };

  const handleOpenContact = () => {
    setCurrentPage('contact');
  };

  const handleOpenAddItemForm = () => {
    setCurrentPage('addItem');
  };

  const handleOpenTodoList = () => {
    setCurrentPage('todo');
  };

  const handleOpenMobileCRUD = () => {
    setCurrentPage('mobile-crud');
  };

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Header
        username={username}
        onLogout={handleLogout}
        onOpenProfile={handleOpenProfile}
        onGoHome={handleGoHome}
        onOpenAdmin={handleOpenAdmin}
        onOpenContact={handleOpenContact}
        onOpenAddItemForm={handleOpenAddItemForm}
        onOpenTodoList={handleOpenTodoList}
        onOpenMobileCRUD={handleOpenMobileCRUD}
        currentPage={currentPage}
      />

      {currentPage === 'home' ? (
        <Home onNavigateToCategory={handleNavigateToCategory} onOpenTodoList={handleOpenTodoList} onOpenMobileCRUD={handleOpenMobileCRUD} />
      ) : currentPage === 'contact' ? (
        <Contact />
      ) : currentPage === 'addItem' ? (
        <AddItemForm />
      ) : currentPage === 'todo' ? (
        <TodoList />
      ) : currentPage === 'mobile-crud' ? (
        <MobileCRUD />
      ) : (
        <List selectedCategory={selectedCategory} onGoHome={handleGoHome} />
      )}

      <Footer />

      {showProfile && (
        <UserProfile
          user={currentUser}
          onUpdateProfile={handleUpdateProfile}
          onClose={handleCloseProfile}
        />
      )}

      {showAdminPanel && (
        <AdminPanel onClose={handleCloseAdmin} />
      )}
    </div>
  );
}

export default App;
