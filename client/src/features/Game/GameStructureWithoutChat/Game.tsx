import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AiOutlineLogout } from "react-icons/ai"
import { toast } from "react-toastify"
import GameRooms from "./GameRooms"
import GameRoomHeader from "./GameRoomHeader"
import GameRoomFooter from "./GameRoomFooter"
import type { IRoomData } from "../../types"

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

function Game({
  socket,
  roomData,
  error,
}: {
  socket: any
  roomData: IRoomData[] | null
  error: Error | null
}): JSX.Element {
  const navigate = useNavigate()
  const query = useQuery()
  const username = query.get("username")
  const roomId = query.get("roomId")
  const roomType = query.get("roomType")
  const roomName = query.get("roomName")
  const myName = localStorage.getItem("userName")

  const [userId, setUserId] = React.useState<string>()

  const [room, setRoom] = React.useState<{
    roomId: string
    roomType: string
    roomName: string
  }>({
    roomId: roomId || "",
    roomType: roomType || "",
    roomName: roomName || "",
  })

  React.useEffect(() => {
    if (room) {
      socket.emit("joinRoom", {
        username,
        room: room.roomId,
        roomType: room.roomType,
        roomName: room.roomName,
      })
    }
  }, [room, room.roomId, socket, username])

  React.useEffect(() => {
    socket.on(
      "message",
      ({ socketId, message }: { socketId: string; message: string }) => {
        toast(message)

        const prevStoredId = localStorage.getItem("userId") || ""

        if (!prevStoredId && socketId) {
          setUserId(socketId)
          localStorage.setItem("userId", socketId + "")
          localStorage.setItem("userName", username + "")
        } else {
          setUserId(prevStoredId)
        }
      }
    )
  }, [socket, username])

  const handleRoomClick = React.useCallback(
    (id: string) => {
      const room = roomData?.filter((rm: any) => rm.id === id)[0]
      if (room) {
        setRoom({
          roomId: room?.id,
          roomType: room?.type,
          roomName: room?.name,
        })
        navigate(
          `/game?username=${username}&roomId=${room?.id}&roomType=${room?.type}&roomName=${room?.name}`,
          { replace: true }
        )
        localStorage.setItem("roomId", room?.id)
        localStorage.setItem("roomName", room?.name)
      }
    },
    [navigate, roomData, username]
  )

  const handleLogoutClick = React.useCallback(() => {
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    socket.emit("disconnect")
    navigate("/")
    socket.off()
  }, [navigate, socket])

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-[#F8F5F2]">
      <GameRoomHeader />

      <div
        style={{ height: "calc(100% - 144px)" }}
        className="bg-[#F8F5F2] w-full flex "
      >
        <div id="room-side" className="w-1/3 p-6">
          <div className="font-bold text-sm	leading-6	text-[#205A6D] mb-4">
            Choose your game room
          </div>
          {error ? (
            <div className="text-red-500 text-sm">{error?.message}</div>
          ) : (
            <div>
              <GameRooms
                roomData={roomData}
                handleRoomClick={handleRoomClick}
              />
              <div className="p-6 bg-white h-[72px] font-bold text-sm text-[#205A6D] flex justify-between items-center absolute left-0 bottom-[72px] w-1/3">
                <div id="user-id" className="cursor-default">
                  <div>User Name: {myName}</div>
                  <div>User ID: {userId}</div>
                </div>{" "}
                <div
                  id="logout-button"
                  className="cursor-pointer"
                  onClick={handleLogoutClick}
                >
                  <span className="flex justify-center items-center">
                    Logout: {<AiOutlineLogout />}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          id="chat-side"
          className="w-2/3 bg-white mr-6 p-6 h-full overflow-y-scroll"
        >
          Game Panel
        </div>
      </div>
      <GameRoomFooter />
    </div>
  )
}

export default Game
