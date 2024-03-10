import React from "react"

function Overlay({ children }: { children: React.ReactElement }) {
  return (
    <div className="@apply fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      {children}
    </div>
  )
}

export { Overlay }
