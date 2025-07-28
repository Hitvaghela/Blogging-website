const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({
    path: path.join(__dirname, 'config.env')
});

console.log('Testing environment variables:');
console.log('PORT:', process.env.PORT);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if the file exists
const fs = require('fs');
const configPath = path.join(__dirname, 'config.env');
console.log('Config file exists:', fs.existsSync(configPath));
console.log('Config file path:', configPath); 