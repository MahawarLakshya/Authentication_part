const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const user = require('./models/users');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authcheck');

const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors({ origin: true }))

// MongoDB connection
const connection = async() => {
    try {
        await mongoose.connect(process.env.mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Database connected');
    } catch (error) {

        console.log('Database connection failed', error.message);

    }
};
connection();


// Routes
app.post('/signup', async(req, res) => {
    const { username, pwd } = req.body;
    try {
        const newuser = new user({ username, pwd });
        await newuser.save();

        const token = jwt.sign({ username: newuser.username }, process.env.secret_key, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error signing up', error: error.message });
    }

})
app.post('/login', async(req, res) => {

    const { username, pwd } = req.body;
    const existuser = await user.findOne({ username, pwd });
    if (existuser && existuser.pwd === pwd) {
        const token = jwt.sign({ username: existuser.username }, process.env.secret_key, { expiresIn: '1h' });

        res.json({ success: true, token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});
app.post('/logout', (req, res) => {

    // res.localStorage.removeItem('token'); 
    res.json({ message: 'Logged out successfully' });
});


// Protected route
app.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ success: true, username: req.user.username });
});

app.listen(3000, () => console.log('Server running on port 3000'));