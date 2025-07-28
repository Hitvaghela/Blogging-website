const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");

// Load environment variables
dotenv.config({
    path: path.join(__dirname, 'config.env')
});

console.log("🔧 Starting simplified server...");
console.log("Environment check:");
console.log("- PORT:", process.env.PORT);
console.log("- GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "❌ NOT SET");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// Simple test route
app.get("/", (req, res) => {
    res.json({ message: "Simplified server is running! ✅" });
});

// Auth routes
app.get("/auth/test", (req, res) => {
    res.json({ 
        message: "Auth test route works! ✅",
        googleConfigured: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
    });
});

app.get("/auth/google", (req, res) => {
    res.json({ 
        message: "Google OAuth route works! ✅",
        googleClientId: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Simplified server running on http://localhost:${PORT}`);
    console.log(`✅ Test these URLs:`);
    console.log(`   - http://localhost:${PORT}/`);
    console.log(`   - http://localhost:${PORT}/auth/test`);
    console.log(`   - http://localhost:${PORT}/auth/google`);
    console.log(`✅ Then test through frontend proxy:`);
    console.log(`   - http://localhost:3000/auth/test`);
    console.log(`   - http://localhost:3000/auth/google`);
}); 