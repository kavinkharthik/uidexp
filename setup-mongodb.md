# MongoDB Setup Guide for Mobile CRUD

## 🚀 Quick Setup Steps:

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Start MongoDB Server
Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service or run `mongod`
- **MongoDB Compass**: Should show "Connected" status

### 3. Start Backend Server
```bash
cd backend
npm run dev
```
Server will start on: `http://localhost:5000`

### 4. Start Frontend
```bash
npm start
```
Frontend will start on: `http://localhost:3000`

## 📱 Database Structure

Your mobile data will be stored in:
- **Database**: `uid` (your existing database)
- **Collection**: `mobiles` (will be created automatically)

## 🔗 API Endpoints

- `GET /api/mobiles` - Get all mobiles
- `POST /api/mobiles` - Add new mobile
- `PUT /api/mobiles/:id` - Update mobile
- `DELETE /api/mobiles/:id` - Delete mobile

## ✅ Testing Connection

1. Open your app in browser
2. Click "🗄️ Mobile CRUD" in navigation
3. Add a mobile phone
4. Check MongoDB Compass - you should see the new collection and data!

## 🎯 Features Ready

- ✅ Create new mobile records
- ✅ View all mobiles in grid
- ✅ Edit existing mobiles
- ✅ Delete mobiles
- ✅ Real-time MongoDB sync
- ✅ Beautiful responsive UI


