import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import CharacterModel from "./CharacterModel.jsx"
import { useGameStore } from "../../useGameStore.js"
import { zombieAi, zombieFlags } from "../../gameHelper.js"

const Zombie = ({ id, type, position=[0,0,0] }) => {
  const { options, getVolume, getMute, getGamepad, player } = useGameStore()
  const group = useRef()
  const anim = useRef("Staggering")
  const transition = useRef("Staggering")
  const forceAnim = useRef(false)
  const speedMultiplier = useRef(1.0)
  const { camera } = useThree()

  const baseSpeed = 4.0

  useFrame((state, delta) => {
    if (!group.current) return
    // if (!player) setPlayer(group)
    if (group.current.health <= 0) return

    const flagStatus = zombieFlags(group, anim, forceAnim)
    if (flagStatus && flagStatus.length > 0) {
      flagStatus.forEach(status => {
        //do flag
      })
    }

    zombieAi(group, anim)

  })

  return (
    <group
      ref={group}
      name="Zombie"
      position={position}
      health={100}
      flagDmg={null}
    >
      <CharacterModel
        model="Zombie"
        anim={anim}
        transition={transition}
        speedMultiplier={speedMultiplier}
        forceAnim={forceAnim}
      />
    </group>
  )
}

export default Zombie
