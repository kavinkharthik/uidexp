import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const switchToRegister = () => {
    setIsLoginMode(false);
  };

  const switchToLogin = () => {
    setIsLoginMode(true);
  };

  const handleRegister = (user) => {
    // Registration successful, could add additional logic here
    console.log('User registered:', user);
  };

  return (
    <>
      {isLoginMode ? (
        <Login 
          onLogin={onLogin} 
          onSwitchToRegister={switchToRegister}
        />
      ) : (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </>
  );
};

export default Auth;
