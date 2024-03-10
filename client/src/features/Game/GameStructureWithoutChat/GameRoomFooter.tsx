import React from "react"
import { HomeMain } from "../../../assets/footer-home"

function GameFooter() {
  return (
    <div
      id="footer"
      className="h-[72px] bg-[#0a3847] absolute bottom-0 w-full flex items-center pl-6 pr-2"
    >
      <HomeMain />
      <div className="pl-2 text-xl font-bold text-white italic pr-2">
        JUST EAT
      </div>
      <div>
        <span className="text-xl font-bold text-white">Takeaway</span>
        <span className="text-md text-white">.com</span>
      </div>
    </div>
  )
}

export default GameFooter
