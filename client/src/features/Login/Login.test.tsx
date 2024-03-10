import { render, screen } from "@testing-library/react"
import { SocketServerMock } from "socket.io-mock-ts"
import { MemoryRouter } from "react-router-dom"
import Login from "./Login"
import roomData from "../../mocks/mockRoomData.json"

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

  test("renders login page initially", () => {
    render(
      <MemoryRouter>
        <Login
          socket={client}
          roomData={roomData}
          loading={false}
          error={null}
        />
      </MemoryRouter>
    )

    expect(screen.getByText("Login")).toBeInTheDocument()
  })
})
