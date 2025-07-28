const express = require("express")
const passport = require('passport');

const {register,login,forgotpassword,resetpassword,getPrivateData} = require("../Controllers/auth");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const router = express.Router() ;

// Test route to verify auth router is working
router.get("/test", (req, res) => {
    res.json({ 
        message: "Auth router is working", 
        timestamp: new Date().toISOString(),
        googleClientId: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set",
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set"
    });
});

// Test route to verify Google OAuth route is accessible
router.get("/google-test", (req, res) => {
    res.json({ 
        message: "Google OAuth route is accessible", 
        googleClientId: process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set",
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set"
    });
});

router.post("/register",register)

router.post("/login",login)

router.post("/forgotpassword",forgotpassword)

router.put("/resetpassword",resetpassword)

router.get("/private",getAccessToRoute,getPrivateData)

// Google OAuth routes
router.get("/google", (req, res, next) => {
    console.log("=== Google OAuth Debug Info ===");
    console.log("Google OAuth route accessed");
    console.log("Request URL:", req.url);
    console.log("Request method:", req.method);
    console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID ? "Set" : "Not set");
    console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET ? "Set" : "Not set");
    
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        console.error("❌ Google OAuth credentials are missing!");
        return res.status(500).json({ 
            error: "Google OAuth not configured properly",
            message: "Please check your environment variables"
        });
    }
    
    console.log("✅ Proceeding with Google OAuth authentication...");
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

router.get("/google/callback", 
    (req, res, next) => {
        console.log("Google OAuth callback route accessed");
        passport.authenticate("google", { 
            failureRedirect: "/login",
            session: false 
        })(req, res, next);
    },
    (req, res) => {
        console.log("Google OAuth successful, user:", req.user);
        // Generate JWT token
        const token = req.user.generateJwtFromUser();
        
        // Redirect to frontend with token
        const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/google/callback?token=${token}`;
        console.log("Redirecting to:", redirectUrl);
        res.redirect(redirectUrl);
    }
);

module.exports = router