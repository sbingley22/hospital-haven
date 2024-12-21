import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import CharacterModel from "./CharacterModel.jsx"
import { useGameStore } from "../../useGameStore.js"
import { inArenaZone, zombieAi, zombieFlags } from "../../gameHelper.js"

let inZone = false

const Zombie = ({ id, type, position=[0,0,0] }) => {
  const { options, getVolume, getMute, getGamepad, player, enemiesRemove, addScore } = useGameStore()
  const group = useRef()
  const anim = useRef("Staggering")
  const transition = useRef("Staggering")
  const forceAnim = useRef(false)
  const speedMultiplier = useRef(1.0)
  const { camera } = useThree()

  const baseSpeed = 1.0
  const brightness = useRef(0.1)

  useFrame((state, delta) => {
    if (!group.current) return
    // if (!player) setPlayer(group)
    if (group.current.health <= -100) return

    const flagStatus = zombieFlags(group, anim, forceAnim)
    if (flagStatus && flagStatus.length > 0) {
      flagStatus.forEach(status => {
        if (status === "health") {
          if (group.current.health <= 0) {
            anim.current = "Die"
            group.current.health = -200
            brightness.current = 0.6
            setTimeout(()=>{
              enemiesRemove(id)
              addScore(10)
            }, 1200)
          }
        }
      })
    }

    //In Zone?
    if (!group.current.flagInZone && inArenaZone(group)) {
      brightness.current = 1.0
      group.current.flagInZone = true
    }

    const speed = baseSpeed * speedMultiplier.current * delta
    zombieAi(group, anim, player, speed)

  })

  return (
    <group
      ref={group}
      name={type}
      position={position}
      health={100}
      flagDmg={null}
      flagInZone={false}
    >
      <CharacterModel
        model={type}
        anim={anim}
        transition={transition}
        speedMultiplier={speedMultiplier}
        forceAnim={forceAnim}
        brightness={brightness}
      />
    </group>
  )
}

export default Zombie
