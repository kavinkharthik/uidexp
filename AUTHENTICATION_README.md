# User Authentication System

This document describes the comprehensive user authentication system implemented in the React Dynamic App.

## Features

### Backend Authentication
- **JWT Token-based Authentication**: Secure token-based authentication with 7-day expiration
- **Password Hashing**: Passwords are securely hashed using bcryptjs
- **User Registration**: Complete user registration with validation
- **User Login**: Secure login with username/email and password
- **Profile Management**: Update user profile information
- **Protected Routes**: API endpoints protected with authentication middleware
- **MongoDB Integration**: User data stored in MongoDB with proper schema

### Frontend Authentication
- **React Context**: Centralized authentication state management
- **Protected Components**: Components that require authentication
- **Automatic Token Management**: Automatic token storage and refresh
- **Loading States**: Proper loading indicators during authentication
- **Error Handling**: Comprehensive error handling and user feedback
- **Persistent Sessions**: Users stay logged in across browser sessions

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/verify` - Verify JWT token

### Protected Mobile CRUD Routes
- `POST /api/mobiles` - Create new mobile (Protected)
- `PUT /api/mobiles/:id` - Update mobile (Protected)
- `DELETE /api/mobiles/:id` - Delete mobile (Protected)

## User Schema

```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  fullName: String,
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  loginCount: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Components

### AuthContext
- Provides authentication state and methods throughout the app
- Handles login, register, logout, and profile updates
- Manages loading states and error handling

### AuthService
- Handles all API communication for authentication
- Manages JWT token storage and retrieval
- Provides utility methods for authentication checks

### ProtectedRoute
- Wrapper component for protecting routes
- Shows loading state while checking authentication
- Redirects to login if not authenticated

### Updated Components
- **Login**: Now uses AuthContext for authentication
- **Register**: Integrated with backend registration API
- **UserProfile**: Uses AuthContext for profile management
- **App**: Wrapped with AuthProvider for global auth state

## Security Features

1. **Password Security**: Passwords are hashed using bcryptjs with salt rounds
2. **JWT Tokens**: Secure token-based authentication with expiration
3. **Input Validation**: Server-side validation for all user inputs
4. **Protected Routes**: API endpoints protected with authentication middleware
5. **Error Handling**: Secure error messages without exposing sensitive information

## Usage

### Starting the Application

1. **Backend Server**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend Application**:
   ```bash
   npm install
   npm start
   ```

### Environment Variables

Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Demo Credentials

For testing purposes, you can use:
- Username: `admin`
- Password: `123456`

Or create a new account through the registration form.

## Authentication Flow

1. **Registration**: User fills out registration form → Backend creates user with hashed password → JWT token generated → User automatically logged in
2. **Login**: User enters credentials → Backend validates → JWT token generated → User logged in
3. **Protected Access**: User accesses protected route → Token verified → Access granted
4. **Logout**: Token removed from storage → User logged out

## Error Handling

The system includes comprehensive error handling:
- Network errors
- Authentication failures
- Validation errors
- Server errors
- Token expiration

All errors are displayed to users with appropriate messages and the system gracefully handles edge cases.

## Future Enhancements

Potential improvements for the authentication system:
- Password reset functionality
- Email verification
- Two-factor authentication
- Social login integration
- Role-based access control
- Session management
- Account deactivation


