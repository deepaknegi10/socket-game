import React from "react"
import { toast } from "react-toastify"
import { GamePlayItem } from "./GamePlayItem"
import { GameChatBodyHeader } from "./GameChatBodyHeader"
import { GameState, GAME_OPTION, TEXT_ALIGN } from "../types"
import GameOverlay from "./GameOverlay"
import OptionComponent from "./OptionsComponent"

interface IGamePanel {
  socket: any
  room: {
    roomId: string
    roomType: string
    roomName: string
  }
}

interface IGamePlayItem {
  number: number
  previousNumber: number
  isFirst: boolean
  user?: string
  selectedNumber: number
  isCorrectResult?: boolean
}

function GamePanel({ socket, room }: IGamePanel) {
  const [gamePlay, setGamePlay] = React.useState<IGamePlayItem[]>([])
  const [gameState, setGameState] = React.useState<GameState>()
  const [gameOver, setGameOver] = React.useState<{
    winner: string
    isOver: boolean
  }>()
  const [currentUser, setCurrentUser] = React.useState<string>()
  const [numberSelected, setNumberSelected] = React.useState<GAME_OPTION>()
  const myName = localStorage.getItem("userName")
  const myId = localStorage.getItem("userId")
  const [randomNumber, setRandomNumber] = React.useState<number>()

  React.useEffect(() => {
    socket.on(
      "onReady",
      ({ state, user }: { state: boolean; user: string }) => {
        if (user !== myId) {
          setCurrentUser(user)
        }
        if (state) socket.emit("letsPlay")
      }
    )
  }, [myId, numberSelected, socket])

  React.useEffect(() => {
    socket.on(
      "activateYourTurn",
      ({ user, state }: { user: string; state: GameState }) => {
        if (state === GameState.PLAY && user === myId && myName) {
          toast(`${myName} please play!`)
        }
        setCurrentUser(user)
        setGameState(state)
      }
    )
  }, [myId, myName, numberSelected, socket])

  React.useEffect(() => {
    socket.on(
      "gameOver",
      ({ user, isOver }: { user: string; isOver: boolean }) => {
        setGameOver({ winner: user, isOver })
      }
    )
  }, [socket])

  React.useEffect(() => {
    socket.on(
      "randomNumber",
      ({
        number,
        isFirst,
        user,
        selectedNumber,
        isCorrectResult,
        previousNumber,
      }: IGamePlayItem) => {
        setRandomNumber(+number)

        if (!isCorrectResult && number === previousNumber) {
          toast("Please play according to original number!")
        }

        if (!isFirst) {
          setGamePlay((gamePlay) => [
            ...gamePlay,
            {
              number,
              isFirst,
              user,
              selectedNumber,
              isCorrectResult,
              previousNumber,
            },
          ])
        }
      }
    )
  }, [socket])

  const handleNumberSelection = (num: GAME_OPTION) => {
    setNumberSelected(num)

    if (randomNumber) {
      socket.emit("sendNumber", {
        number: +randomNumber,
        selectedNumber: num,
      })
    } else {
      console.log("can't emit sendNumber as randomNumber is not available")
    }
  }

  const handleNewGameClick = React.useCallback(() => {
    // reset the states
    setGamePlay([])
    setGameOver({ winner: "", isOver: false })
    socket.emit("letsPlay")
  }, [socket])

  return (
    <>
      <GameChatBodyHeader
        room={room}
        randomNumber={randomNumber}
        length={gamePlay.length}
      />
      <GameOverlay
        handleNewGameClick={handleNewGameClick}
        gameOver={gameOver}
        setGameOver={setGameOver}
      />
      <div>
        {gamePlay.map((num, i) => {
          return (
            <div key={`${num.number}_${i}`}>
              <GamePlayItem
                textAlign={
                  num.user === myName ? TEXT_ALIGN.LEFT : TEXT_ALIGN.RIGHT
                }
                numberSelected={num.selectedNumber}
                number={num.previousNumber}
              />
            </div>
          )
        })}
      </div>

      <OptionComponent // to show [-1, 0, 1]
        gameState={gameState}
        currentUser={currentUser}
        handleNumberSelection={handleNumberSelection}
      />
    </>
  )
}

export { GamePanel }
