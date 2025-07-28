const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");

// Load environment variables
dotenv.config({
    path: path.join(__dirname, 'config.env')
});

console.log("Testing Google OAuth configuration...");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "❌ NOT SET");
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ NOT SET");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

// Create a simple test server
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));

// Test route
app.get("/auth/test", (req, res) => {
    res.json({ 
        message: "Backend is working", 
        googleClientId: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set",
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Test server running on port ${PORT}`);
    console.log(`✅ Test URL: http://localhost:${PORT}/auth/test`);
    console.log(`✅ Google OAuth URL: http://localhost:${PORT}/auth/google`);
}); 