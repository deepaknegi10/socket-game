import { render, screen } from "@testing-library/react"
import { SocketServerMock } from "socket.io-mock-ts"
import { MemoryRouter } from "react-router-dom"
import { GamePanel } from "./GamePanel"

const socket = new SocketServerMock()
const client = socket.clientMock

let mockEmitter = jest.fn()
jest.mock("socket.io-client", () => {
  return jest.fn(() => ({
    emit: mockEmitter,
    on: jest.fn(),
  }))
})

describe("App test", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("renders game page", () => {
    render(
      <MemoryRouter>
        <GamePanel
          socket={client}
          room={{
            roomId: "aa0c54fa",
            roomType: "human",
            roomName: "Room Amsterdam",
          }}
        />
      </MemoryRouter>
    )

    expect(screen.getByText("Room Amsterdam")).toBeInTheDocument()
  })
})
