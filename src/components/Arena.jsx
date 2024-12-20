import { useEffect, useRef } from "react"
import { useGameStore } from "../useGameStore.js"
import Player from "./characters/Player"
import Zombie from "./characters/Zombie.jsx"
import { v4 as uuidv4 } from 'uuid'
import ArenaHospital from "./ArenaHospital.jsx"

const Arena = () => {
  const { player, enemies, setEnemies, enemyAdd, enemyGroup, setEnemyGroup } = useGameStore()
  const enemiesGroup = useRef()

  useEffect(()=>{
    if (!enemyGroup) setEnemyGroup(enemiesGroup)
    enemyAdd(uuidv4(), "Zombie F", [-8, 0, -4])
    enemyAdd(uuidv4(), "Zombie M", [4, 0, 3])

  }, [])

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <ArenaHospital />

      <Player />

      <group ref={enemiesGroup} >
        {enemies.map(en => (
          <Zombie 
            key={en.id} 
            id={en.id}
            position={en.position}
            type={en.type}
          />
        ))}
      </group>
    </>
  )
}

export default Arena
