import React from "react"
import { GameState } from "../types"

interface IOptions {
  gameState?: GameState
  currentUser?: string
  handleNumberSelection: (num: number) => void
}

function OptionsComponent({
  gameState,
  currentUser,
  handleNumberSelection,
}: IOptions) {
  const myId = localStorage.getItem("userId")

  return (
    <>
      {!(gameState === GameState.WAIT && myId === currentUser) ? (
        <div className="flex direction-column w-full items-center justify-around">
          <>
            {[-1, 0, 1].map((num) => {
              return (
                <div
                  key={num}
                  className="w-16 h-16 rounded-full shadow border border-black flex items-center justify-center mt-4 cursor-pointer font-bold"
                  onClick={() => handleNumberSelection(num)}
                >
                  <span className="text-[#1574F5]">{num}</span>
                </div>
              )
            })}
          </>
        </div>
      ) : null}
    </>
  )
}

export default OptionsComponent
