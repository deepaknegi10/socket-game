import React from "react"
import { TEXT_ALIGN, GAME_OPTION } from "../types"
import { Icon, Player } from "../../../assets"

function GamePlayItem({
  textAlign,
  numberSelected,
  number = 0,
}: {
  textAlign: TEXT_ALIGN
  numberSelected: GAME_OPTION
  number?: number
}) {
  const calculatedNumber = (numberSelected + number) / 3
  const isLeftAligning = textAlign === TEXT_ALIGN.LEFT

  return (
    <div>
      {isLeftAligning ? (
        <div className="flex mb-4">
          <Icon />
          <div className="flex flex-col justify-start ml-4">
            <div className="mb-2 w-16 h-16 rounded-full shadow-lg border-1 border-black flex items-center justify-center bg-[#205A6D] text-white font-bold text-2xl">
              {numberSelected}
            </div>
            <div className="mb-2 py-1 px-3 bg-[#F8F5F2] w-full text-[#454649] font-normal text-sm	leading-6">{`[ ( ${numberSelected} + ${number} ) / 3 ]`}</div>
            <div className="mb-2 py-1 px-3 bg-[#F8F5F2] w-full text-left text-[#454649] font-normal text-sm	leading-6">
              {calculatedNumber}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex mb-4 justify-end">
          <div className="flex flex-col justify-end items-end mr-4">
            <div className="mb-2 w-16 h-16 rounded-full shadow-lg border-1 border-black flex items-center justify-center bg-[#1574F5] text-white font-bold text-2xl">
              {numberSelected}
            </div>
            <div className="mb-2 py-1 px-3 bg-[#F8F5F2] w-full text-[#454649] font-normal text-sm	leading-6">{`[ ( ${numberSelected} + ${number} ) / 3 ]`}</div>
            <div className="mb-2 py-1 px-3 bg-[#F8F5F2] w-full text-right text-[#454649] font-normal text-sm	leading-6">
              {calculatedNumber}
            </div>
          </div>
          <Player />
        </div>
      )}
    </div>
  )
}

export { GamePlayItem, TEXT_ALIGN }
