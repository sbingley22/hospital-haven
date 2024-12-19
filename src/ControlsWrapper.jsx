import { KeyboardControls } from "@react-three/drei"
import { useGameStore } from "./useGameStore"
import Gamepad from "react-gamepad"

const ControlsWrapper = ({ children }) => {
  const { getGamepad, options } = useGameStore()

  const handleGamepadButtonDown = (buttonName) => {
    if (!options.useController) return
    if (!buttonName) return
    const gamepad = getGamepad()
    if (!gamepad) return
    // console.log(`Button ${buttonName} pressed`)

    if (buttonName === "A") gamepad.interact = true
    else if (buttonName === "X") gamepad.interact = true
    else if (buttonName === "DPadUp") gamepad.interact = true
  }

  const handleGamepadButtonUp = (buttonName) => {
    if (!options.useController) return
    if (!buttonName) return
    const gamepad = getGamepad()
    if (!gamepad) return
    // console.log(`Button ${buttonName} released`)

    if (buttonName === "A") gamepad.interact = false
    else if (buttonName === "X") gamepad.interact = false
    else if (buttonName === "DPadUp") gamepad.interact = false
  }

  const handleGamepadAxisChange = (axisName, value) => {
    if (!options.useController) return
    const gamepad = getGamepad()
    if (!gamepad) return
    // console.log(`${axisName} : ${value}`)

    if (axisName === "LeftStickX") gamepad.moveX = value
    else if (axisName === "LeftStickY") gamepad.moveY = value
    else if (axisName === "RightStickX") gamepad.moveX = value
    else if (axisName === "RightStickY") gamepad.moveY = value
    else if (axisName === "LeftTrigger") {
      if (value > 0.4) gamepad.interact = true
      else gamepad.interact = false
    }else if (axisName === "RightTrigger") {
      if (value > 0.4) gamepad.interact = true
      else gamepad.interact = false
    }
  }  
  const handleConnect = (gamepadIndex) => {
    console.log(`Gamepad ${gamepadIndex} connected!`)
  }
  const handleDisconnect = (gamepadIndex) => {
    console.log(`Gamepad ${gamepadIndex} disconnected!`)
  }

  return (
    <>
      <KeyboardControls 
        map={[
        { name: "forward", keys: ["ArrowUp", "w", "W", "i", "I"] },
        { name: "backward", keys: ["ArrowDown", "s", "S", "k", "K"] },
        { name: "left", keys: ["ArrowLeft", "a", "A", "j", "J"] },
        { name: "right", keys: ["ArrowRight", "d", "D", "l", "L"] },
        { name: "interact", keys: ["Space", "f", "F", "h", "H"] },
        { name: "inventoryLeft", keys: ["[", "1"] },
        { name: "inventoryRight", keys: ["]", "2"] },
        { name: "inventoryUse", keys: ["p", "o", "P", "O", "q", "Q"] },
        { name: "shift", keys: ["Shift"] },
        { name: "zoomIn", keys: ["="] },
        { name: "zoomOut", keys: ["-"] },
        ]}
      >
        <Gamepad
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onButtonDown={handleGamepadButtonDown}
          onButtonUp={handleGamepadButtonUp}
          onAxisChange={handleGamepadAxisChange}
        >
          {children}
        </Gamepad>
      </KeyboardControls>
    </>
  )
}

export default ControlsWrapper
