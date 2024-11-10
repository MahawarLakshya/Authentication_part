import axios from 'axios';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'; // For React Toastify
// import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';


const Signup = () => {
    const [username,setUsername]=useState('')
    const [pwd,setpwd]=useState('')
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);

     const onhandleSubmit=async(e)=>{ 
        e.preventDefault();  
        if (!username || !pwd) {
          toast.error("All fields are required!");
          return;
      }

       try{ 
        const resp=await axios.post('http://localhost:3000/signup',{
            username,pwd
        })
      
        if(resp.data.success)
        {
            localStorage.setItem('token', resp.data.token); 
            navigate('/dashboard');
        }
        else{
          toast.error(resp.data.message);
        }
      }
        catch(error)
        {
          if (error.response.status === 409) {
            toast.error("User already exists!");
        } else {
            toast.error("Signup failed! Please try again.");
        }        }   
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"><ToastContainer />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Create an Account on <span className="text-indigo-600">App</span>
        </h1>
        
        <form onSubmit={onhandleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
    </label>
    <input
        type={showPassword ? "text" : "password"}
        value={pwd}
        autoComplete='false'
        onChange={(e) => setpwd(e.target.value)}
        placeholder="Enter your password"
        className="w-full px-4 py-2 pr-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" // Added pr-10 for padding
    />
    <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-[40px] right-0 flex items-center pr-[0.75rem]"
        >
        {showPassword ? (
            <EyeOffIcon className="w-5 h-5 text-gray-500" />
        ) : (
            <EyeIcon className="w-5 h-5 text-gray-500" />
        )}
    </button>
</div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? 
            <a href="/" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup