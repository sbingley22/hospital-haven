import { useGameStore } from "../../useGameStore"

const PatientHud = () => {
  const { setPaused, patientHud, setPatientHud, patient } = useGameStore()

  const closeMenu = () => {
    setPatientHud(false)
    setPaused(false)
  }

  return patientHud ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Overlay background */}
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-4/5 max-w-md">
        {/* Content of the HUD */}
        <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
        <p>{patient && patient.status.info}</p>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => closeMenu()} // Close the HUD
        >
          &times;
        </button>
      </div>
    </div>
  ) : null;
};

export default PatientHud;
