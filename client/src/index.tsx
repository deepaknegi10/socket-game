import React from "react"
import { render } from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./index.css"

const root = document.getElementById("root") as HTMLElement
render(<App />, root)

reportWebVitals()
