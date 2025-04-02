const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://24uglyandrew:weaklings162@testcluster.jcuqa.mongodb.net/myWebsiteDB?retryWrites=true&w=majority&appName=testcluster')
    .then(() => console.log("Connected to MongoDB - myWebsiteDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Register Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    res.json({ message: "User registered successfully!" });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid username or password" });

    req.session.user = user; // Store user in session
    res.json({ message: "Login successful!" });
});

// Check Login Status Route
app.get('/auth/status', async (req, res) => {
    console.log("Session Data:", req.session); // Log session data
    if (req.session && req.session.user) {
        return res.json({ loggedIn: true });
    }
    res.json({ loggedIn: false });
});

app.listen(5000, () => console.log('Server running on port 5000'));