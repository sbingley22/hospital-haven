import { useRef, useEffect } from "react"
import glbJill from "../../assets/Jill Logan.glb?url"
import glbZombie from "../../assets/Zombie Fem.glb?url"
import { useSkinnedMeshClone } from "./SkinnedMeshClone.js"
import { useAnimations } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { MeshBasicMaterial, Color } from "three"

const CharacterModel = ({ model="Jill", anim, transition="Idle", speedMultiplier={current:1}, forceAnim={current:false} }) => {
  let glb = glbJill
  if (model === "Zombie") glb = glbZombie
  const { scene, nodes, animations } = useSkinnedMeshClone(glb)
  const { mixer, actions } = useAnimations(animations, scene)
  const lastAnim = useRef(anim.current)
  
  // Initial Setup
  useEffect(()=>{
    console.log(nodes, actions)

    // Replace all materials with MeshBasicMaterial, preserving textures
    scene.traverse((object) => {
      if (object.isMesh || object.isSkinnedMesh) {
        const originalMaterial = object.material;
        object.material = new MeshBasicMaterial({
          map: originalMaterial.map, // Use the texture map from the original material
          color: originalMaterial.color, // Preserve the color if needed
          // color: new Color(1.9, 1.9, 1.9), // RGB multiplier > 1 for brightness boost
        });
      }
    });

    if (actions[anim.current]){
      actions[anim.current].play()
    }

  },[nodes, actions])

  // Mixer Settings
  useEffect(()=>{
    if (!mixer) return

    const oneShotAnims = ["Pistol Fire"]
    oneShotAnims.forEach(osa => {
      if (!actions[osa]) {
        console.log("No such action: ", osa)
        return
      }
      actions[osa].clampWhenFinished = true
      actions[osa].repetitions = 1
    })

    mixer.addEventListener("finished", (e) => {
      const action = e.action.getClip().name
      // console.log(action)
      if (anim.current === "dead") return

      if (action === "cqc dmg") {
        if (transition.current) anim.current = transition.current
        return
      }

      anim.current = "Idle"
    })

    return mixer.removeEventListener("finished")
  }, [mixer, actions, anim, transition])

  // Animation Speed
  const getTimeScale = () => {
    let timescale = 1

    if (["Walking"].includes(anim.current)) timescale *= speedMultiplier.current
  
    return timescale
  }

  // Update Animations
  const updateAnimations = () => {
    if (forceAnim.current) {
      forceAnim.current = false
    }
    else if (anim.current === lastAnim.current) return
    if (!actions[anim.current]) console.log("Couldnt find animation", anim.current, lastAnim.current)

    const fadeTime = 0.1
    actions[lastAnim.current].fadeOut(fadeTime)

    const action = actions[anim.current].reset().fadeIn(fadeTime).play()

    const timescale = getTimeScale()
    action.setEffectiveTimeScale(timescale)

    lastAnim.current = anim.current
  }

  // Game Loop
  useFrame((state, delta) => {
    updateAnimations()
  })

  return (
    <>
      <primitive object={scene} />
    </>
  )
}

export default CharacterModel
