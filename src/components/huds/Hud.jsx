import { useGameStore } from "../../useGameStore.js"
import BookHud from "./BookHud.jsx"
import DxHud from "./DxHud.jsx"
import PatientHud from "./PatientHud.jsx"
import UpgradeHud from "./UpgradeHud.jsx"

const Hud = () => {
  const { hudInfo, score, patientsSaved } = useGameStore()

  return (
    <div
      className="w-full h-full absolute"
    >
      <div
        className="p-4 flex rounded-sm justify-between text-lg"
        style={{backgroundColor: hudInfo.shine ? "rgba(55,0,0,0.7" : "rgba(0,0,0,0.7)"}}
      >
        <p
          className={hudInfo.playerHealth > 70 ? "text-green-500" : hudInfo.playerHealth > 30 ? "text-yellow-500" : "text-red-500"}
        >
          Health: {hudInfo.playerHealth}
        </p>
        <p
          className={"text-yellow-500 pl-4 pr-4"}
        >
          Coin: {score}
        </p>
        <p
          className={"text-yellow-500 pl-4 pr-4"}
        >
          Combo: x{hudInfo.combo}
        </p>
        <p
          className={"text-yellow-500 pl-4 pr-4"}
        >
          Patients Saved: {patientsSaved}
        </p>
        <p
          className={hudInfo.patientHealth > 20 ? "text-green-500" : hudInfo.patientHealth > 5 ? "text-yellow-500" : "text-red-500"}
        >
          Patient: {hudInfo.patientHealth}
        </p>
      </div>
      <div 
        className="absolute bottom-6 right-6 p-4 rounded-sm text-lg"
      >
        {hudInfo.msg !== "" && <p
          className={"text-green-500 p-4 rounded-sm"}
          style={{backgroundColor: "rgba(0,0,0,0.7)"}}
        >
          {hudInfo.msg}
        </p>}
      </div>

      <PatientHud />
      <DxHud />
      <BookHud />
      <UpgradeHud />
    </div>
  )
}

export default Hud
