import GameScene from './GameScene.jsx'
import Hud from './Hud.jsx'

function Game() {

  return (
    <div className="flex w-full h-screen justify-center items-center bg-black">
      <GameScene />
      <Hud />
    </div>
  )
}

export default Game
