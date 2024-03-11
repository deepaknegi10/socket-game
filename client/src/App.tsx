import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./features/Login"
import { Game } from "./features/Game"
import { ToastContainer } from "react-toastify"
import { useFetch } from "./hooks/useFetch"
import type { IRoomData } from "./features/types"
import { SOCKET_URL, HOST_URL } from "./constants"
import "./App.css"

const roomUrl = `${HOST_URL}/rooms`
const io = require("socket.io-client/dist/socket.io")
const socket = io.connect(SOCKET_URL)
socket.connect()

function App() {
  const { data, error, loading } = useFetch<IRoomData[] | null>(roomUrl)

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
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
