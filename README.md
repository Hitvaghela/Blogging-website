# MERN Blog V2

A full-stack blogging application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring Google OAuth authentication, CRUD operations, and a modern responsive design.


## 🌟 Features

- **User Authentication**: JWT-based authentication with Google OAuth
- **Blog Management**: Create, read, update, and delete blog posts
- **Rich Text Editor**: CKEditor integration for content creation
- **Image Upload**: Support for story and profile images
- **Search & Pagination**: Advanced search functionality with pagination
- **Comments System**: Interactive commenting with star ratings
- **Reading List**: Save and manage favorite articles
- **Responsive Design**: Mobile-first responsive UI
- **Real-time Updates**: Dynamic content updates
- **Security**: Input validation, CORS protection, and secure file uploads

## 🚀 Live Demo

- **Frontend**: [Your Frontend URL]
- **Backend API**: [Your Backend URL]

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Cloud Console account (for OAuth)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Hitvaghela/Blogging-website
```

### 2. Install Dependencies

```bash
# Install all dependencies (root, backend, and frontend)
npm run install-all

# Or install separately:
npm install
cd Backend && npm install
cd ../Frontend && npm install
```

### 3. Environment Configuration

#### Backend Configuration

Create a `Backend/config.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=your_mongodb_atlas_connection_string

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE=60m
RESET_PASSWORD_EXPIRE=3600000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Session Secret
SESSION_SECRET=your_session_secret_key
```

#### Frontend Configuration

Create a `Frontend/.env` file:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback` (development)
   - `https://your-domain.com/auth/google/callback` (production)

### 5. Run the Application

#### Development Mode

```bash
# Run both frontend and backend concurrently
npm run dev

# Or run separately:
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

#### Production Mode

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
mern-blog-v2/
├── Backend/
│   ├── config/
│   │   ├── passport.js          # Google OAuth configuration
│   │   └── config.env           # Environment variables
│   ├── Controllers/
│   │   ├── auth.js              # Authentication controllers
│   │   ├── story.js             # Story CRUD operations
│   │   ├── user.js              # User management
│   │   └── comment.js           # Comment operations
│   ├── Models/
│   │   ├── user.js              # User schema
│   │   ├── story.js             # Story schema
│   │   └── comment.js           # Comment schema
│   ├── Routers/
│   │   ├── auth.js              # Authentication routes
│   │   ├── story.js             # Story routes
│   │   ├── user.js              # User routes
│   │   └── comment.js           # Comment routes
│   ├── Middlewares/
│   │   ├── auth.js              # Authentication middleware
│   │   └── errorHandler.js      # Error handling
│   └── server.js                # Main server file
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthScreens/     # Authentication components
│   │   │   ├── StoryScreens/    # Story-related components
│   │   │   ├── ProfileScreens/  # User profile components
│   │   │   └── GeneralScreens/  # Common components
│   │   ├── Context/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── Css/                 # Stylesheets
│   │   └── App.js               # Main App component
│   └── public/                  # Static files
├── .gitignore                   # Git ignore rules
├── package.json                 # Root package.json
└── README.md                    # Project documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/google` - Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `POST /auth/forgotpassword` - Forgot password
- `PUT /auth/resetpassword` - Reset password

### Stories
- `GET /story/getAllStories` - Get all stories with pagination
- `POST /story/addstory` - Create new story
- `GET /story/:slug` - Get story by slug
- `PUT /story/:slug/edit` - Update story
- `DELETE /story/:slug/delete` - Delete story
- `POST /story/:slug/like` - Like/unlike story

### Users
- `GET /user/profile` - Get user profile
- `POST /user/editProfile` - Update user profile
- `PUT /user/changePassword` - Change password

### Comments
- `POST /comment/:slug/addComment` - Add comment
- `GET /comment/:slug/getComments` - Get story comments


## 🛡️ Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Secure file upload restrictions
- Rate limiting (recommended for production)
- Environment variable protection

## 🧪 Testing

```bash
# Run backend tests
cd Backend && npm test

# Run frontend tests
cd Frontend && npm test
```

## 🙏 Acknowledgments

- [React.js](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [CKEditor](https://ckeditor.com/) - Rich text editor
- [Google OAuth](https://developers.google.com/identity/protocols/oauth2) - Authentication

## 📞 Support

If you have any questions or need help:

1. Check the [Issues](https://github.com/Hitvaghela/Blogging-website/issues) page
2. Create a new issue with detailed description
3. Contact: hitvaghela3108@example.com

---
