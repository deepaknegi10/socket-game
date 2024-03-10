import { render, screen } from "@testing-library/react"
import { SocketServerMock } from "socket.io-mock-ts"
import { MemoryRouter } from "react-router-dom"
import Game from "./Game"
import roomData from "../../../mocks/mockRoomData.json"

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
        <Game socket={client} roomData={roomData} error={null} />
      </MemoryRouter>
    )

    expect(screen.getByText("Scoober team")).toBeInTheDocument()
  })
})
