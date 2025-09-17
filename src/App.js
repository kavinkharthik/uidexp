import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import ProtectedRoute from './components/ProtectedRoute';

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

function AppContent() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleLogout = async () => {
    await logout();
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

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="App">
      <Header
        username={user?.username || user?.fullName || 'User'}
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
        <ProtectedRoute>
          <AddItemForm />
        </ProtectedRoute>
      ) : currentPage === 'todo' ? (
        <ProtectedRoute>
          <TodoList />
        </ProtectedRoute>
      ) : currentPage === 'mobile-crud' ? (
        <ProtectedRoute>
          <MobileCRUD />
        </ProtectedRoute>
      ) : (
        <List selectedCategory={selectedCategory} onGoHome={handleGoHome} />
      )}

      <Footer />

      {showProfile && (
        <UserProfile onClose={handleCloseProfile} />
      )}

      {showAdminPanel && (
        <AdminPanel onClose={handleCloseAdmin} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
