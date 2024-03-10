import React from "react"

function GameChatBodyHeader({
  room,
  randomNumber,
  length,
}: {
  room: { roomId: string; roomType: string; roomName: string }
  randomNumber?: number
  length: number
}) {
  return (
    <div className="flex justify-between items-center mb-4">
      {room.roomName ? (
        <div className="flex items-start">
          <span className="font-bold text-sm leading-6 text-[#205A6D] mr-2">
            You are in room:{" "}
          </span>
          <span className="font-bold text-lg text-[#205A6D]">
            {room.roomName}
          </span>
        </div>
      ) : null}
      {randomNumber && length === 0 ? (
        <div className="flex items-start">
          <span className="font-bold text-sm leading-6	text-[#205A6D] mr-2">
            Initial Ramdom Number:
          </span>
          <span className="font-bold text-sm leading-6 text-[#205A6D]">
            {randomNumber}
          </span>
        </div>
      ) : null}
    </div>
  )
}

export { GameChatBodyHeader }
