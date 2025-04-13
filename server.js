// Load dependencies
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');

// Create app
const app = express();

// Setup middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // Session timeout
        sameSite: 'none' // Cross-site cookies
    }
}));
app.use(express.static(__dirname)); // Serve files

// Log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request: ${req.method} ${req.url}`);
    console.log(`Cookies:`, req.headers.cookie || 'No cookies');
    console.log(`Session ID: ${req.sessionID}, Session Data:`, req.session);
    next();
});

// Connect database
mongoose.connect('mongodb+srv://24uglyandrew:weaklings162@testcluster.jcuqa.mongodb.net/myWebsiteDB?retryWrites=true&w=majority&appName=testcluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define user model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Define product model
const ProductSchema = new mongoose.Schema({
    name: String,
    price: String,
    img: String,
    category: String
});
const Product = mongoose.model('Product', ProductSchema);

// Handle registration
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check inputs
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Save new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.json({ message: 'User registered successfully!' });
    } catch (error) {
        // Server error
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Handle login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check inputs
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Verify user
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Create session
        req.session.user = { id: user._id, username: user.username };
        res.json({ message: 'Login successful!' });
    } catch (error) {
        // Server error
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Handle logout
app.post('/logout', (req, res) => {
    // Clear session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

// Check login status
app.get('/auth/status', (req, res) => {
    res.json({ loggedIn: !!req.session.user, username: req.session.user?.username });
});

// Fetch products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        // Server error
        res.status(500).json({ message: 'Server error fetching products' });
    }
});

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/log.html');
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
