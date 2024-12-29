import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import CharacterModel from "./CharacterModel.jsx"
import { useGameStore } from "../../useGameStore.js"
import { playerInteract, playerMovement, updateCamera, updateHeldInputs, playerAttack, playerFlags, findChildByName, playAudio } from "../../gameHelper.js"
import { useKeyboardControls } from "@react-three/drei"

const Player = () => {
  const { resetGame, setMode, options, getVolume, getMute, getGamepad, player, setPlayer, setHudInfoParameter, enemyGroup, paused, setPaused, setPatientHud, setDxHud, setBookHud, setUpgradeHud, upgrades } = useGameStore()
  const group = useRef()
  const anim = useRef("Idle")
  const transition = useRef("Idle")
  const forceAnim = useRef(false)
  const [, getKeys] = useKeyboardControls()
  const heldInputs = useRef({
    interact: false,
  })
  const { camera } = useThree()

  const baseSpeed = 1.8
  const speedMultiplier = useRef(1.1)
  const combo = useRef(0)
  const shineActive = useRef(false)
  const gunShine = useRef(-1.0)
  const beltRef = useRef()
  const gunRef = useRef()
  const lastInteraction = useRef(false)
  const footstepTimer = useRef(0.0)

  const resetShine = (keepCombo=false) => {
    if (!keepCombo) {
      combo.current = 0
      speedMultiplier.current = 1.0
      if (upgrades["Speed Boots"]) speedMultiplier.current += 0.8
      setHudInfoParameter({combo: 0})
    }
    else {
      setHudInfoParameter({combo: combo.current})
    }

    shineActive.current = false
    gunShine.current = -0.8
    // gun shine
    if (gunRef && gunRef.current) gunRef.current.material.color.setRGB(0.1, 0.1, 0.1)
    else gunRef.current = findChildByName(group.current, "Pistol") 
    // belt shine
    if (beltRef && beltRef.current) beltRef.current.material.color.setRGB(0.1, 0.07, 0.07)
    else beltRef.current = findChildByName(group.current, "Belt") 

    setHudInfoParameter({shine: false})
  }

  const shine = () => {
    shineActive.current = true
    let r = 0.1
    let g = 0.0
    let b = 0.0
    if (gunRef && gunRef.current) gunRef.current.material.color.setRGB(r,g,b)
    if (beltRef && beltRef.current) beltRef.current.material.color.setRGB(r,g,b)
    
    playAudio("./audio/gun-cock.wav", options.volume * 0.2, options.mute)

    setHudInfoParameter({shine: true})
  }

  useFrame((state, delta) => {
    if (!group.current) return
    if (!player) setPlayer(group)
    if (group.current.health <= 0) return
    if (paused) return
     
    const keyboard = getKeys()
    const gamepad = getGamepad()
    const inputs = {
      heldInputs: heldInputs.current,
      keyboard: keyboard,
      gamepad: gamepad,
    }

    const flagStatus = playerFlags(group, anim, forceAnim, options, upgrades)
    if (flagStatus && flagStatus.length > 0) {
      flagStatus.forEach(status => {
        if (status === "health") setHudInfoParameter({playerHealth: group.current.health})
        if (status === "dead") {
          setTimeout(()=>{
            console.log("game over")
            setMode(5)
            resetGame()
          }, 1000)
        }
      })
    }

    gunShine.current += delta
    let shineTime = 1.0 - (combo.current / 20)
    if (shineTime < 0.2) shineTime = 0.2
    if (gunShine.current >= shineTime) {
      resetShine(true)
    }
    if (gunShine.current >= 0.0 && shineActive.current === false) {
      shine()
    }

    const interaction = playerInteract(group, inputs)
    if (interaction) {
      lastInteraction.current = true
      if (interaction.object === "showPatientHud") {
        if (interaction.interacting) {
          setPaused(true)
          setPatientHud(true)
        }
        else {
          setHudInfoParameter({msg:"View Patient"})
        }
      }
      else if (interaction.object === "showDxHud") {
        if (interaction.interacting) {
          setPaused(true)
          setDxHud(true)
        }
        else {
          setHudInfoParameter({msg:"Order Tests"})
        }
      }
      else if (interaction.object === "showBookHud") {
        if (interaction.interacting) {
          setPaused(true)
          setBookHud(true)
        }
        else {
          setHudInfoParameter({msg:"Read Text Books"})
        }
      }
      else if (interaction.object === "showUpgradeHud") {
        if (interaction.interacting) {
          setPaused(true)
          setUpgradeHud(true)
        }
        else {
          setHudInfoParameter({msg:"Upgrades"})
        }
      }
    }
    else if (lastInteraction.current) setHudInfoParameter({msg:""})

    if (!interaction) {
      const moveResult = playerAttack(group, anim, inputs, options, enemyGroup, gunShine, combo, upgrades)
      if (moveResult === "miss") resetShine()
      else if (moveResult === "hit") {
        combo.current++
        // speedMultiplier.current = 1.0 + (combo.current * 0.1)
        speedMultiplier.current += 0.1
        resetShine(true)
      }
    }

    playerMovement(group, inputs, anim, transition, options, baseSpeed, speedMultiplier, delta, footstepTimer)

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
