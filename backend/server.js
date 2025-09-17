const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '../config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - Connect to your existing 'uid' database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/uid';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Mobile Schema
const mobileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: String, required: true },
    storage: { type: String },
    ram: { type: String },
    color: { type: String },
    display: { type: String },
    camera: { type: String },
    battery: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Mobile = mongoose.model('Mobile', mobileSchema);

// API Routes

// GET - Read all mobiles
app.get('/api/mobiles', async (req, res) => {
    try {
        const mobiles = await Mobile.find().sort({ createdAt: -1 });
        res.json(mobiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET - Read single mobile
app.get('/api/mobiles/:id', async (req, res) => {
    try {
        const mobile = await Mobile.findById(req.params.id);
        if (!mobile) {
            return res.status(404).json({ error: 'Mobile not found' });
        }
        res.json(mobile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST - Create new mobile
app.post('/api/mobiles', async (req, res) => {
    try {
        const mobile = new Mobile(req.body);
        await mobile.save();
        res.status(201).json(mobile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT - Update mobile
app.put('/api/mobiles/:id', async (req, res) => {
    try {
        req.body.updatedAt = new Date();
        const mobile = await Mobile.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!mobile) {
            return res.status(404).json({ error: 'Mobile not found' });
        }
        res.json(mobile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE - Delete mobile
app.delete('/api/mobiles/:id', async (req, res) => {
    try {
        const mobile = await Mobile.findByIdAndDelete(req.params.id);
        if (!mobile) {
            return res.status(404).json({ error: 'Mobile not found' });
        }
        res.json({ message: 'Mobile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Mobile CRUD API is running!' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Mobile CRUD API: http://localhost:${PORT}/api/mobiles`);
});
