import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
const Dashboard = () => {
  // const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { user,setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (token) {
          const response = await axios.get('https://authentication-part.onrender.com/dashboard', {
            headers: {
              Authorization: token // Send token in headers
            }
          });
          // console.log(response.data);  // Log the response to check the data
          setUser(response.data); // Set the username in state
        } else {
          navigate('/'); // Redirect to login if token is missing
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
        navigate('/'); // Redirect to login if fetch fails
      }
    };

    fetchUsername();
  }, [navigate,setUser]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout'); // Call the logout endpoint
      localStorage.removeItem('token'); // Remove the token from local storage
      setUser(null); // Set the user in context to
      navigate('/'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-4xl font-semibold">Welcome {user?.username } to Your Dashboard!</h1>
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
