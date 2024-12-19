import { useState } from 'react'
import { useGameStore } from '../useGameStore.js'

function MainMenu() {
  const { setMode } = useGameStore()

  return (
    <div className="flex w-full h-screen justify-center items-center bg-yellow-500">
      <button 
        className="rounded-2xl text-xl font-bold m-6 p-4 border-2 border-green-800 bg-yellow-300"
        onClick={()=>setMode(0)}
      >
        Play
      </button>
    </div>
  )
}

export default MainMenu
