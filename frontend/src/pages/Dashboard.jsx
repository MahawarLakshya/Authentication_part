import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  
  
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout'); // Call the logout endpoint
            localStorage.removeItem('token'); // Remove the token from local storage
            navigate('/'); // Redirect to the login page
        } catch (error) {
            console.error('Logout failed', error); 
        }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-4xl font-semibold">Welcome to Your Dashboard!</h1>
      <button
        onClick={handleLogout}
        className="absolute bottom-5 left-5 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
