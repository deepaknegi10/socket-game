import React from "react"
import { toast } from "react-toastify"
import { GameState, GAME_OPTION } from "../types"
import { Icon, Player } from "../../../assets"

interface IGamePanel {
  socket: any
  room: {
    roomId: string
    roomType: string
    roomName: string
  }
  numOfUsers: number
}

interface IGamePlayItem {
  number: number
  previousNumber: number
  isFirst: boolean
  user?: string
  selectedNumber: number
  isCorrectResult?: boolean
}

function GamePanel({ socket, room, numOfUsers }: IGamePanel) {
  const [gamePlay, setGamePlay] = React.useState<IGamePlayItem[]>([])
  const [gameState, setGameState] = React.useState<GameState>()
  const [currentUser, setCurrentUser] = React.useState<string>()
  const [numberSelected, setNumberSelected] = React.useState<GAME_OPTION>()
  const [randomNumber, setRandomNumber] = React.useState<number>()
  const myName = localStorage.getItem("userName")
  const myId = localStorage.getItem("userId")

  React.useEffect(() => {
    console.log("onReady received")
    socket.on("onReady", ({ state }: { state: boolean }) => {
      console.log("state", state, "letsPlay triggered")
      // if (state) socket.emit("letsPlay")
    })
  }, [numberSelected, socket])

  socket.on(
    "activateYourTurn",
    ({ user, state }: { user: string; state: GameState }) => {
      if (state === GameState.PLAY && user === myId && myName)
        toast(`${myName} please play!`)
      setCurrentUser(user)
      setGameState(state)
    }
  )

  socket.on("gameOver", console.log("Game Over"))

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

        console.log("********")
        console.log(number, isFirst, user, selectedNumber, isCorrectResult)
        console.log("********")

        // if (!isFirst) {
        // const previousNumber = isCorrectResult
        //   ? Math.ceil(number) * 3 - selectedNumber
        //   : number
        // console.log("previousNumber", previousNumber)

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
        // }

        // }
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

  return (
    <>
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
        {randomNumber && gamePlay.length === 0 ? (
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
      <button>Lets Play!</button>
      <div>
        {gamePlay.map((num, i) => {
          return (
            <div key={`${num.number}_${i}`}>
              <div>
                {num.user === myName ? (
                  <div className="flex mb-4">
                    <Icon />
                    <div className="flex flex-col justify-start ml-4">
                      <div className="mb-2 w-16 h-16 rounded-full shadow-lg border-1 border-black flex items-center justify-center bg-[#205A6D] text-white font-bold text-2xl">
                        {numberSelected}
                      </div>
                      <div className="mb-2 py-1 px-3 bg-[#F8F5F2] w-full text-[#454649] font-normal text-sm	leading-6">{`[ ( ${numberSelected} + ${num.previousNumber} ) / 3 ]`}</div>
                      <div className="mb-2 py-1 px-3 bg-[#F8F5F2] w-full text-left text-[#454649] font-normal text-sm	leading-6">
                        {(num.selectedNumber + num.previousNumber) / 3}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex mb-4 justify-end">
                    <div className="flex flex-col justify-end items-end mr-4">
                      <div className="mb-2 w-16 h-16 rounded-full shadow-lg border-1 border-black flex items-center justify-center bg-[#1574F5] text-white font-bold text-2xl">
                        {numberSelected}
                      </div>
                      <div className="mb-2 py-1 px-3 bg-[#F8F5F2] w-full text-[#454649] font-normal text-sm	leading-6">{`[ ( ${numberSelected} + ${num.previousNumber} ) / 3 ]`}</div>
                      <div className="mb-2 py-1 px-3 bg-[#F8F5F2] w-full text-right text-[#454649] font-normal text-sm	leading-6">
                        {(num.selectedNumber + num.previousNumber) / 3}
                      </div>
                    </div>
                    <Player />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

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
    </>
  )
}

export { GamePanel }
