import { useGLTF } from "@react-three/drei"
import glb from "../assets/Hospital Arena.glb?url"
import { useEffect } from "react"
import { MeshBasicMaterial } from "three"

const ArenaHospital = () => {
  const { scene, nodes } = useGLTF(glb)

  // Initial Setup
  useEffect(()=>{
    // Replace all materials with MeshBasicMaterial, preserving textures
    scene.traverse((object) => {
      if (object.isMesh || object.isSkinnedMesh) {
        const originalMaterial = object.material;
        object.material = new MeshBasicMaterial({
          map: originalMaterial.map,
          color: originalMaterial.color,
        });
      }
    });
  }, [])

  return (
    <>
      <primitive object={scene} />
    </>
  )
}

export default ArenaHospital
