import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import CharacterModel from "./CharacterModel.jsx"
import { useGameStore } from "../../useGameStore.js"
import { playerInteract, playerMovement, updateCamera, updateHeldInputs, playerAttack, playerFlags, findChildByName } from "../../gameHelper.js"
import { useKeyboardControls } from "@react-three/drei"

const Player = () => {
  const { setMode, options, getVolume, getMute, getGamepad, player, setPlayer, setHudInfoParameter, enemyGroup, paused, setPaused, patientHud, setPatientHud } = useGameStore()
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
  const gunShine = useRef(-1.0)
  const beltRef = useRef()
  const gunRef = useRef()

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

    gunShine.current += delta
    if (gunShine.current >= 0.4) {
      gunShine.current = -0.8
      // gun shine
      if (gunRef && gunRef.current) gunRef.current.material.color.setRGB(0.1, 0.1, 0.1)
      else gunRef.current = findChildByName(group.current, "Pistol") 
      // belt shine
      if (beltRef && beltRef.current) beltRef.current.material.color.setRGB(0.1, 0.07, 0.07)
      else beltRef.current = findChildByName(group.current, "Belt") 
    }
    if (gunShine.current >= 0.0) {
      if (gunRef && gunRef.current) gunRef.current.material.color.setRGB(0.0, 0.2, 0.0);
      if (beltRef && beltRef.current) beltRef.current.material.color.setRGB(0.0, 0.2, 0.0);
    }

    const interaction = playerInteract(group, inputs)
    if (interaction === "showPatientHud") {
      setPaused(true)
      setPatientHud(true)
    }

    playerAttack(group, anim, inputs, enemyGroup, gunShine)

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
