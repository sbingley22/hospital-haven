import { useEffect, useRef } from "react"
import { useGameStore } from "../useGameStore.js"
import Player from "./characters/Player"
import Zombie from "./characters/Zombie.jsx"
import { v4 as uuidv4 } from 'uuid'
import ArenaHospital from "./ArenaHospital.jsx"
import { patients } from "../assets/Patients.js"
import { useFrame } from "@react-three/fiber"

const Arena = () => {
  const { player, enemies, setEnemies, enemyAdd, enemyGroup, setEnemyGroup, setPatient, setHudInfoParameter, patientCured, setPatientCured, addPatientsSaved } = useGameStore()
  const enemiesGroup = useRef()

  const roundNumber = useRef(0)
  const gameTimer = useRef(0.0)
  const roundTimer = useRef(0.0)
  const patientHealth = useRef(40)

  useEffect(()=>{
    if (patientCured === null) return

    newRound()

    if (patientCured) {
      addPatientsSaved(1) 
    }
    else {
      addPatientsSaved(-1)
      if (player.current) player.current.flagDmg = {damage: 25, range: 2}
    }

    setPatientCured(null)
  }, [patientCured])

  const newRound = () => {
    roundNumber.current++
    const currentRound = roundNumber.current

    newPatient()
    patientHealth.current = 40
    roundTimer.current = 0

    setEnemies([])

    setTimeout(()=>{spawnWave(3 + roundNumber.current)}, 1500)

    let waveEnd = 0
    for (let index = 1; index < 3; index++) {
      let time = 20000 * index - (index**2 * 100)
      setTimeout(()=>{ 
        if (roundNumber.current !== currentRound) return
        spawnWave(3 + roundNumber.current)
      }, time)
    }
    waveEnd = (20000 * 3) + 15000
    for (let index = 1; index < 5; index++) {
      let time = waveEnd + (15000 * index - (index**2 * 100))
      setTimeout(()=>{ 
        if (roundNumber.current !== currentRound) return
        spawnWave(3 + roundNumber.current)
      }, time)
    }
    waveEnd = waveEnd + (15000 * 5) + 16000
  }

  const newPatient = () => {
    const randomIndex = Math.floor(Math.random() * patients.length)
    setPatient(patients[randomIndex])
  }

  const spawnWave = (amount) => {
    if (!enemiesGroup) return
    if (!enemyGroup) setEnemyGroup(enemiesGroup)
    // debugger
    if (enemies.length > 20) return

    for (let index = 0; index < amount; index++) {
      spawnEnemy()
    }
  }

  const spawnEnemy = () => {
    const modelRandom = Math.floor(Math.random()*2)
    let model = "Zombie F"
    if (modelRandom == 1) model = "Zombie M"

    let x = (Math.random() * 20) - 15
    let z = (Math.random() * 20) - 10
    if (x > -10) {
      if (z > 0) z = 10
      else z = -10
    }

    enemyAdd(uuidv4(), model, [x, 0, z])
  }

  useEffect(()=>{
    newRound()
  }, [])

  useFrame((state, delta) => {
    gameTimer.current += delta
    roundTimer.current += delta

    patientHealth.current -= delta / 5
    setHudInfoParameter({patientHealth: Math.ceil(patientHealth.current)})
    if (patientHealth.current <= 0) {
      patientHealth.current = 40
      setPatientCured(false)
    }

  })

  return (
    <>
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
