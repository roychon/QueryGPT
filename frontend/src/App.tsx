import { useState } from 'react'
import './App.css'
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom" // Import BrowserRouter, Route, and Routes
import Home from './pages/Home'
import Form from './components/Form'

function App() {
  // TODO: add * route and error not found page
  const [count, setCount] = useState(0)
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Form text="signup" />} /> {/*TODO: create separate pages for signup and login */}
      </Routes>
    </Router>
  )
}

export default App;
