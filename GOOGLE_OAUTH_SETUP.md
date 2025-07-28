# Google OAuth Setup Guide

This guide will help you set up Google OAuth for your MERN blog application.

## Prerequisites

- Google Cloud Console account
- Node.js and npm installed
- MongoDB database

## Step 1: Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application" as the application type
   - Add authorized redirect URIs:
     - `http://localhost:5000/auth/google/callback` (for development)
     - `https://yourdomain.com/auth/google/callback` (for production)
5. Copy your Client ID and Client Secret

## Step 2: Environment Configuration

1. Copy the example environment file:
   ```bash
   cp Backend/config.env.example Backend/config.env
   ```

2. Update your `Backend/config.env` file with your credentials:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   FRONTEND_URL=http://localhost:3000
   SESSION_SECRET=your_random_session_secret
   ```

## Step 3: Install Dependencies

Make sure you have installed the required packages:
```bash
cd Backend
npm install passport passport-google-oauth20 express-session
```

## Step 4: Database Schema Updates

The User model has been updated to support Google OAuth:
- `googleId`: Stores the Google user ID
- `isGoogleUser`: Boolean flag to identify Google OAuth users
- `password`: Made optional for Google OAuth users

## Step 5: Testing

1. Start your backend server:
   ```bash
   cd Backend
   npm start
   ```

2. Start your frontend application:
   ```bash
   cd Frontend
   npm start
   ```

3. Navigate to the login page and click "Continue with Google"

## How It Works

1. **User clicks "Continue with Google"** → Redirects to Google OAuth
2. **Google authenticates user** → Returns user profile data
3. **Backend processes authentication**:
   - Checks if user exists with Google ID
   - If not, checks if user exists with same email
   - Creates new user or updates existing user
   - Generates JWT token
4. **Redirects to frontend** → With JWT token
5. **Frontend stores token** → User is logged in

## Security Features

- Email matching: If a user already exists with the same email, the account is linked to Google OAuth
- JWT token generation: Secure authentication tokens
- Session management: Proper session handling
- CORS configuration: Secure cross-origin requests

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI" error**:
   - Make sure your redirect URI in Google Cloud Console matches exactly
   - Check for trailing slashes or protocol mismatches

2. **"Client ID not found" error**:
   - Verify your GOOGLE_CLIENT_ID in config.env
   - Make sure the Google+ API is enabled

3. **"Session not found" error**:
   - Check your SESSION_SECRET configuration
   - Ensure express-session is properly configured

4. **CORS errors**:
   - Verify FRONTEND_URL in your environment variables
   - Check that credentials are enabled in CORS configuration

## Production Deployment

For production deployment:

1. Update your Google OAuth redirect URIs to use HTTPS
2. Set NODE_ENV=production
3. Use a strong SESSION_SECRET
4. Configure proper CORS origins
5. Use secure cookies for sessions

## Support

If you encounter any issues, check:
- Google Cloud Console logs
- Backend server logs
- Browser console for frontend errors
- Network tab for API request/response details 