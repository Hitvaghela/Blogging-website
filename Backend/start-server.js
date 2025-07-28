const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

console.log("Starting server test...");

// Check if config.env file exists
const configPath = path.join(__dirname, 'config.env');
if (!fs.existsSync(configPath)) {
    console.error('❌ Error: config.env file not found at:', configPath);
    process.exit(1);
}

console.log('✅ Config file found at:', configPath);

// Load environment variables
const result = dotenv.config({
    path: configPath
});

if (result.error) {
    console.error('❌ Error loading environment variables:', result.error);
    process.exit(1);
}

console.log('✅ Environment variables loaded successfully:');
console.log('PORT:', process.env.PORT);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ NOT SET');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ NOT SET');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

// Test if passport can be loaded
try {
    const passport = require('./config/passport');
    console.log('✅ Passport configuration loaded successfully');
} catch (error) {
    console.error('❌ Error loading passport configuration:', error.message);
    process.exit(1);
}

console.log('✅ All tests passed! Server should start successfully.'); 