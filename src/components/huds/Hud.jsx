import { useGameStore } from "../../useGameStore.js"
import PatientHud from "./PatientHud.jsx"

const Hud = () => {
  const { hudInfo, score } = useGameStore()

  return (
    <div
      className="w-full h-full absolute"
    >
      <div
        className="p-4"
      >
        <p
          className={hudInfo.playerHealth > 70 ? "text-green-500" : hudInfo.playerHealth > 30 ? "text-yellow-500" : "text-red-500"}
        >
          Health : {hudInfo.playerHealth}
        </p>
        <p
          className={hudInfo.playerHealth > 70 ? "text-green-500" : hudInfo.playerHealth > 30 ? "text-yellow-500" : "text-red-500"}
        >
          Coin : {score}
        </p>
      </div>

      <PatientHud />
    </div>
  )
}

export default Hud
