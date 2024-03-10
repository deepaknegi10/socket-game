import React from "react"
import { Icon } from "../../../assets/icon"

function gameRoomHeader() {
  return (
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
  )
}

export default gameRoomHeader
