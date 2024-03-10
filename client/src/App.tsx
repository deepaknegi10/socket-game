import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/game" element={<div>Game</div>} />
          <Route path="/" element={<div>Login</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
