import { useEffect, useRef } from "react"
import { useGameStore } from "../useGameStore.js"
import Player from "./characters/Player"
import Zombie from "./characters/Zombie.jsx"
import { v4 as uuidv4 } from 'uuid'
import ArenaHospital from "./ArenaHospital.jsx"
import { patients } from "../assets/Patients.js"
import { useFrame } from "@react-three/fiber"

let patientHealth = 40

const Arena = () => {
  const { enemies, enemyAdd, enemyGroup, setEnemyGroup, setPatient, setHudInfoParameter } = useGameStore()
  const enemiesGroup = useRef()

  useEffect(()=>{
    if (!enemyGroup) setEnemyGroup(enemiesGroup)
    enemyAdd(uuidv4(), "Zombie F", [-8, 0, -4])
    enemyAdd(uuidv4(), "Zombie M", [4, 0, 3])

    const randomIndex = Math.floor(Math.random() * patients.length)
    setPatient(patients[randomIndex])
  }, [])

  useFrame((state, delta) => {
    patientHealth -= delta / 10
    setHudInfoParameter({patientHealth: Math.ceil(patientHealth)})
  })

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