const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");

// Load environment variables
dotenv.config({
    path: path.join(__dirname, 'config.env')
});

console.log("Testing backend routes...");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "❌ NOT SET");
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ NOT SET");

// Create a simple test server
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Test basic route
app.get("/", (req, res) => {
    res.json({ message: "Backend is running" });
});

// Test auth route
app.get("/auth/test", (req, res) => {
    res.json({ 
        message: "Auth route is working",
        googleClientId: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set"
    });
});

// Mock Google OAuth route (without passport for testing)
app.get("/auth/google", (req, res) => {
    res.json({ 
        message: "Google OAuth route is accessible",
        redirectUrl: "This would redirect to Google OAuth"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Test server running on port ${PORT}`);
    console.log(`✅ Test URLs:`);
    console.log(`   - http://localhost:${PORT}/`);
    console.log(`   - http://localhost:${PORT}/auth/test`);
    console.log(`   - http://localhost:${PORT}/auth/google`);
    console.log(`✅ Frontend proxy should forward to these URLs`);
}); 