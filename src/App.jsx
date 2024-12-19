import { useGameStore } from './useGameStore.js'
import MainMenu from './components/MainMenu.jsx'
import Game from './components/Game.jsx'
import ControlsWrapper from './ControlsWrapper.jsx'

function App() {
  const { mode } = useGameStore()

  return (
    <ControlsWrapper>
      <>
        {mode === 0 && <Game />}
        {mode === 5 && <MainMenu />}
      </>
    </ControlsWrapper> 
  )
}

export default App
