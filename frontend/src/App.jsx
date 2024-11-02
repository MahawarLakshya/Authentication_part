import Signup from '/src/pages/Signup'
// import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from '/src/pages/Login'

import './App.css'
import React from 'react'
import Dashboard from '/src/pages/Dashboard'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
   
    </Router> )
}

export default App
