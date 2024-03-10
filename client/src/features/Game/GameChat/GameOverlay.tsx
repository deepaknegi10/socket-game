import React from "react"
import { Win, Loose } from "../../../assets"
import { Overlay } from "../../../components/Overlay"

interface IGameOverlay {
  gameOver?: {
    winner: string
    isOver: boolean
  }
  setGameOver: ({ winner, isOver }: { winner: string; isOver: boolean }) => void
  handleNewGameClick: () => void
}

function GameOverlay({
  gameOver,
  setGameOver,
  handleNewGameClick,
}: IGameOverlay): JSX.Element {
  const myName = localStorage.getItem("userName")

  return (
    <div className="flex direction-column w-full items-center justify-around">
      {gameOver?.isOver &&
      gameOver.winner.toLowerCase() === myName?.toLowerCase() ? (
        <Overlay>
          <>
            <div className="w-full absolute right-8 top-4 flex justify-end">
              <button
                className="font-semibold text-4xl text-white z-100 transform rotate-45"
                onClick={() => {
                  setGameOver({ winner: "", isOver: false })
                }}
              >
                +
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Win />
              <div className="font-bold text-white text-4xl mt-4">You Win!</div>
              <button
                className="min-w-48 height h-14 bg-white mt-4 border rounded-3xl text-[#1574F5] font-semibold"
                onClick={handleNewGameClick}
              >
                New Game
              </button>
            </div>
          </>
        </Overlay>
      ) : null}
      {gameOver?.isOver &&
      gameOver.winner.toLowerCase() !== myName?.toLowerCase() ? (
        <Overlay>
          <>
            <div className="w-full absolute right-8 top-4 flex justify-end">
              <button
                className="font-semibold text-4xl text-white z-100 transform rotate-45"
                onClick={() => {
                  setGameOver({ winner: "", isOver: false })
                }}
              >
                +
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Loose />
              <div className="font-bold text-white text-4xl mt-4">
                You Loose!
              </div>
              <button
                className="min-w-48 height h-14 bg-white mt-4 border rounded-3xl text-[#1574F5] font-semibold"
                onClick={handleNewGameClick}
              >
                New Game
              </button>
            </div>
          </>
        </Overlay>
      ) : null}
    </div>
  )
}

export default GameOverlay
