import { useEffect, useRef } from "react"
import { useGameStore } from "../useGameStore.js"
import Player from "./characters/Player"
import Zombie from "./characters/Zombie.jsx"
import { v4 as uuidv4 } from 'uuid'

const Arena = () => {
  const { player, enemies, setEnemies, enemyAdd, setEnemyGroup } = useGameStore()
  const enemiesGroup = useRef()

  useEffect(()=>{
    enemyAdd(uuidv4(), "Zombie", [-5, 0, 0])
    enemyAdd(uuidv4(), "Zombie", [5, 0, 0])

  }, [])

  return (
    <>
      {/* <ambientLight intensity={1} /> */}

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
