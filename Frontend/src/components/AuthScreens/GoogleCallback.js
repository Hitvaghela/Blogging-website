import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Css/Loader.css";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (error) {
      // Handle error
      console.error('Google OAuth error:', error);
      navigate('/login?error=google_auth_failed');
      return;
    }

    if (token) {
      // Store token and redirect
      localStorage.setItem("authToken", token);
      navigate('/');
    } else {
      // No token found, redirect to login
      navigate('/login?error=no_token');
    }
  }, [location, navigate]);

  return (
    <div className="loader-container">
      <div className="loader">
        <div className="spinner"></div>
        <p>Processing Google login...</p>
      </div>
    </div>
  );
};

export default GoogleCallback; 