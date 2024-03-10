import { render, screen } from "@testing-library/react"
import { SocketServerMock } from "socket.io-mock-ts"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import Login from "./Login"
import roomData from "../../mocks/mockRoomData.json"

const renderAppWithRouter = (loading = false) => {
  render(
    <MemoryRouter>
      <Login
        socket={client}
        roomData={roomData}
        loading={loading || false}
        error={null}
      />
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

  test("error shows properly", () => {
    renderAppWithRouter()

    const inputElement = screen.getByPlaceholderText("Username")
    userEvent.type(inputElement, "testuser")

    const loginButton = screen.getByText("Log In")
    userEvent.click(loginButton)

    expect(
      screen.getByText("Username and Room are required")
    ).toBeInTheDocument()
  })

  test("renders the select element with the default option", () => {
    renderAppWithRouter()

    const selectElement = screen.getByRole("combobox")
    expect(selectElement).toBeInTheDocument()
    // @ts-ignore
    expect(selectElement.value).toBe("")
    expect(screen.getByText("Select a Room")).toBeInTheDocument()
  })

  test("renders loading message when loading is true", () => {
    renderAppWithRouter(true)
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  test("renders room options when provided", () => {
    renderAppWithRouter()

    const optionElement1 = screen.getByText("Room Berlin CPU")
    expect(optionElement1).toBeInTheDocument()
    const optionElement2 = screen.getByText("Room Izmir CPU")
    expect(optionElement2).toBeInTheDocument()
    const optionElement3 = screen.getByText("Room Amsterdam")
    expect(optionElement3).toBeInTheDocument()
  })
})
