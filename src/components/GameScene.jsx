import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Arena from "./Arena"
import { useGameStore } from "../useGameStore"

const GameScene = () => {
  const { options } = useGameStore()

  return (
    <Canvas
      camera={{
        position: [0,8,8],
        fov: 60,
      }}
      dpr={options.resolution}
    >
      <Suspense>
        <Arena />
      </Suspense>
    </Canvas>
  )
}

export default GameScene
