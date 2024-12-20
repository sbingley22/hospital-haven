import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import CharacterModel from "./CharacterModel.jsx"
import { useGameStore } from "../../useGameStore.js"
import { playerMovement, updateCamera, updateHeldInputs, playerAttack, playerFlags } from "../../gameHelper.js"
import { useKeyboardControls } from "@react-three/drei"

const Player = () => {
  const { setMode, options, getVolume, getMute, getGamepad, player, setPlayer, setHudInfoParameter } = useGameStore()
  const group = useRef()
  const anim = useRef("Idle")
  const transition = useRef("Idle")
  const forceAnim = useRef(false)
  const speedMultiplier = useRef(1.0)
  const [, getKeys] = useKeyboardControls()
  const heldInputs = useRef({
    interact: false,
  })
  const { camera } = useThree()

  const baseSpeed = 1.8

  useFrame((state, delta) => {
    if (!group.current) return
    if (!player) setPlayer(group)
    if (group.current.health <= 0) return
     
    const keyboard = getKeys()
    const gamepad = getGamepad()
    const inputs = {
      heldInputs: heldInputs.current,
      keyboard: keyboard,
      gamepad: gamepad,
    }

    const flagStatus = playerFlags(group, anim, forceAnim)
    if (flagStatus && flagStatus.length > 0) {
      flagStatus.forEach(status => {
        if (status === "health") setHudInfoParameter({playerHealth: group.current.health})
      })
    }

    playerAttack(group, anim, inputs)

    playerMovement(group, inputs, anim, transition, options, baseSpeed, speedMultiplier, delta )

    updateCamera(group, camera)
    updateHeldInputs(heldInputs, inputs)
  })

  return (
    <group
      ref={group}
      name="Player"
      position={[0,0,0]}
      health={100}
      flagDmg={null}
    >
      <CharacterModel
        anim={anim}
        transition={transition}
        speedMultiplier={speedMultiplier}
        forceAnim={forceAnim}
      />
    </group>
  )
}

export default Player
