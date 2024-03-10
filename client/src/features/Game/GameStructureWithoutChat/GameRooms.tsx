import React from "react"
import { BsChevronRight } from "react-icons/bs"
import { IRoomData } from "../../types"

function GameRooms({
  roomData,
  handleRoomClick,
}: {
  roomData: IRoomData[] | null
  handleRoomClick: (id: string) => void
}) {
  return (
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
  )
}

export default GameRooms
