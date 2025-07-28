const dotenv = require("dotenv")
const path = require("path")
const fs = require("fs")

// Check if config.env file exists
const configPath = path.join(__dirname, 'config.env');
if (!fs.existsSync(configPath)) {
    console.error('Error: config.env file not found at:', configPath);
    process.exit(1);
}

// Load environment variables first, before any other imports
const result = dotenv.config({
    path: configPath
});

if (result.error) {
    console.error('Error loading environment variables:', result.error);
    process.exit(1);
}

// Debug: Check if environment variables are loaded
console.log('Environment variables loaded successfully:');
console.log('PORT:', process.env.PORT);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Set' : 'NOT SET');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'NOT SET');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

const express = require("express")
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/passport")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

connectDatabase()

const app = express() ;

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}))

// Session middleware
app.use(session({
    secret:  'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static files middleware (moved before routes)
app.use(express.static(path.join(__dirname , "public") ))

// Routes
app.use("/",IndexRoute)

// Error handling
app.use(customErrorHandler)

const PORT = process.env.PORT || 5000 ;

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)
    console.log(`Google OAuth callback URL: http://localhost:${PORT}/auth/google/callback`)

})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
})