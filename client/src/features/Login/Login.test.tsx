import { render, screen } from "@testing-library/react"
import { SocketServerMock } from "socket.io-mock-ts"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import Login from "./Login"
import roomData from "../../mocks/mockRoomData.json"

const renderAppWithRouter = () => {
  render(
    <MemoryRouter>
      <Login socket={client} roomData={roomData} loading={false} error={null} />
    </MemoryRouter>
  )
}

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
    renderAppWithRouter()
    expect(screen.getByText("Login")).toBeInTheDocument()
  })

  test("renders the component with the correct label and placeholder", () => {
    renderAppWithRouter()

    const labelElement = screen.getByText("Username*")
    expect(labelElement).toBeInTheDocument()

    const inputElement = screen.getByPlaceholderText("Username")
    expect(inputElement).toBeInTheDocument()
  })

  test("updates the state when the input value changes", () => {
    renderAppWithRouter()

    const inputElement = screen.getByPlaceholderText("Username")
    userEvent.type(inputElement, "testuser")

    // @ts-ignore
    expect(inputElement.value).toBe("testuser")
  })
})
