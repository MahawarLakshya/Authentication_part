import Signup from '/src/pages/Signup'
// import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from '/src/pages/Login'
import  UserContextProvider  from '/src/context/UserContextProvider'
import './App.css'
import React from 'react'
import Dashboard from '/src/pages/Dashboard'

function App() {


  return (
    <UserContextProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
   
    </Router> 
    </UserContextProvider>
    )
}

export default App
