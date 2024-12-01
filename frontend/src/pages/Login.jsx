import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import React ,{ useState }from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [username,setUsername]=useState('')
    const [pwd,setpwd]=useState('')
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate();
        
    const handlesubmit=async(e)=>{
        e.preventDefault();
        
        if (!username || !pwd) {
          toast.error("All fields are required!");
        return ; }

        try{ 
          const resp=await axios.post('https://authentication-part.onrender.com/login',{
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
          if(error.response.status===401)
            toast.error("Invalid credentials");
          else
            toast.error("Error logging in");
      }   
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-80">
            <ToastContainer />
            <h1 className="text-3xl font-semibold text-center text-gray-700 mb-2">
              Login to <span className="text-indigo-600">App</span>
            </h1>
            
            <form onSubmit={handlesubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
    
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword?"password":"text"}
                  value={pwd}
                  onChange={(e) => setpwd(e.target.value)}
                  autoComplete='false'
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[215px] right-0 flex items-center pr-[2.75rem]"
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
                className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?
                <a href="/signup" className="text-indigo-500 hover:underline">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      );
    };
export default Login
