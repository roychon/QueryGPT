import { useState } from 'react'
import './App.css'
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom" // Import BrowserRouter, Route, and Routes
import Home from './pages/Home'
import SignUpForm from './pages/SignUpForm'
import LogInForm from "./pages/LoginForm"
import Chats from './pages/Chats'
import ChatDetails from './pages/ChatDetails'

function App() {
  // TODO: add * route and error not found page
  // const [count, setCount] = useState(0)
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} /> {/*TODO: create separate pages for signup and login */}
        <Route path="/login" element={<LogInForm />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/:threadId" element={<ChatDetails />} />
      </Routes>
    </Router>
  )
}

export default App;
