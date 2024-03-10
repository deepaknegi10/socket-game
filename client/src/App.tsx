import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./features/Login"
import Game from "./features/Game"
import { useFetch } from "./hooks/useFetch"
import type { IRoomData } from "./features/types"
import "./App.css"

const io = require("socket.io-client/dist/socket.io")
const socket = io.connect("http://localhost:8082")
socket.connect()

function App() {
  const { data, error, loading } = useFetch<IRoomData[] | null>(
    "http://localhost:3004/rooms"
  )

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                socket={socket}
                roomData={data}
                error={error}
                loading={loading}
              />
            }
          />
          <Route
            path="/game"
            element={<Game socket={socket} roomData={data} error={error} />}
          />
          <Route
            path="/"
            element={
              <Login
                socket={socket}
                roomData={data}
                error={error}
                loading={loading}
              />
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
