import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Arena from "./Arena"

const GameScene = () => {

  return (
    <Canvas
      camera={{
        position: [0,8,8],
        fov: 60,
      }}
    >
      <Suspense>
        <Arena />
      </Suspense>
    </Canvas>
  )
}

export default GameScene
