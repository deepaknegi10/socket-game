import * as React from "react"
import { useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"

import type { IRoomData } from "../types"

const LoginComponent = ({
  socket,
  roomData,
  loading,
  error,
}: {
  socket: any
  roomData: IRoomData[] | null
  loading: boolean
  error: Error | null
}): JSX.Element => {
  const [username, setUsername] = React.useState("")
  const [room, setRoom] = React.useState("")
  const [loginError, setLoginError] = React.useState("")
  const navigate = useNavigate()

  const roomOptions = React.useMemo(() => {
    return roomData?.map((room) => ({
      value: room.id,
      label: room.name,
    }))
  }, [roomData])

  const handleLogin = () => {
    // Add logic to emit a login event to the server and navigate to the game room
    // Use Socket.IO to emit the username and room to the server

    if (!username || !room) {
      setLoginError("Username and Room are required")
    } else {
      socket.emit("login", { username, room })
      const selectedRoom = roomData?.filter((rm) => {
        return rm.id === room
      })[0]
      localStorage.setItem("roomId", room)
      localStorage.setItem("roomName", selectedRoom?.name || "")
      navigate(
        `/game?username=${username}&roomId=${room}&roomType=${selectedRoom?.type}&roomName=${selectedRoom?.name}`
      )
    }
  }

  return (
    <div className="bg-[#FF8000]">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-center block text-gray-700 text-lg font-bold mb-2">
              Login
            </h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username*
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="room"
              >
                Room*
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              >
                <option value="">
                  {loading ? "Loading..." : "Select a Room"}
                </option>
                {roomOptions?.map((room) => {
                  return (
                    <option key={room.value} value={room.value}>
                      {room.label}
                    </option>
                  )
                })}
              </select>
              <div className="text-red-500 text-sm">{error?.message}</div>
            </div>
            <div className="flex items-center justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
          </form>
          <div className="text-black-500 text-md">{loginError}</div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
