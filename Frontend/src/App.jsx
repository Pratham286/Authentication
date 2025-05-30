import React from "react"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Welcome from "./Pages/Welcome"
import Home from "./Pages/Home"
import {Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Welcome />} />
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App
