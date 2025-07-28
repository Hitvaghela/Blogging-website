const dotenv = require("dotenv");
const path = require("path");
const express = require("express");
const cors = require("cors");

// Load environment variables
dotenv.config({
    path: path.join(__dirname, 'config.env')
});

console.log("🚀 Starting quick backend test...");
console.log("Environment variables:");
console.log("- PORT:", process.env.PORT);
console.log("- GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "❌ NOT SET");
console.log("- GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ NOT SET");

// Create simple server
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Test routes
app.get("/", (req, res) => {
    res.json({ message: "Backend is running! ✅" });
});

app.get("/auth/test", (req, res) => {
    res.json({ 
        message: "Auth route works! ✅",
        googleConfigured: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
    });
});

app.get("/auth/google", (req, res) => {
    res.json({ 
        message: "Google OAuth route accessible! ✅",
        nextStep: "This would redirect to Google OAuth"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`✅ Test URLs:`);
    console.log(`   - http://localhost:${PORT}/`);
    console.log(`   - http://localhost:${PORT}/auth/test`);
    console.log(`   - http://localhost:${PORT}/auth/google`);
    console.log(`✅ Frontend should proxy to these URLs`);
}); 