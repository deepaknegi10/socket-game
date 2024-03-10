import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AiOutlineLogout } from "react-icons/ai"
import { toast } from "react-toastify"
import { BsChevronRight } from "react-icons/bs"
import type { IRoomData } from "../types"
import { Icon } from "../../assets/icon"

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
      <header
        id="header"
        className="flex h-[72px] w-full items-center bg-[#FF8000] absolute top-0"
      >
        <div className="px-0 pl-4 pr-4">
          <Icon />
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-lg leading-20 text-white">
            Scoober team
          </div>
          <div className="font-normal text-base leading-24 text-white">
            Win the game or win the job
          </div>
        </div>
      </header>

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
              <div>
                {roomData?.map((room) => {
                  return (
                    <div
                      key={room.id}
                      className="p-6 bg-white h-[72px] mb-0.5 font-bold text-sm text-[#205A6D] flex justify-between items-center cursor-pointer"
                      onClick={() => {
                        // We should clear the gamePlay state once room other than current clicked
                        handleRoomClick(room.id)
                      }}
                    >
                      {room.name}
                      <BsChevronRight />
                    </div>
                  )
                })}
              </div>
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
      </div>
      <div
        id="footer"
        className="h-[72px] bg-[#0a3847] absolute bottom-0 w-full flex"
      ></div>
    </div>
  )
}

export default Game
