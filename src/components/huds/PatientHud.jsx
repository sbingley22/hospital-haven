import { useState } from "react";
import { useGameStore } from "../../useGameStore"

const PatientHud = () => {
  const { setPaused, patientHud, setPatientHud, patient, setPatientCured } = useGameStore()
  const [makeDx, setMakeDx] = useState(false)
  const [dxOptions, setDxOptions] = useState([])

  const closeMenu = () => {
    setPatientHud(false)
    setPaused(false)
  }

  const diagnose = () => {
  setMakeDx(true);
  const temp = [];
  temp.push(patient.status.diagnosis);
  patient.status.wrongDiagnosis.forEach((wd) => {
    temp.push(wd);
  });

  // Shuffle the temp array
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }

  setDxOptions(temp);
};


  const confirmDx = (d) => {
    closeMenu()
    setMakeDx(false)

    if (patient.status.diagnosis === d) {
      setPatientCured(true)
      return
    }

    setPatientCured(false)
  }

  return patientHud ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Overlay background */}
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-4/5 max-w-md">
        {makeDx ? 
        <>
          {dxOptions.map((d, index) => (
            <button
              key={index + d}
              onClick={()=>confirmDx(d)}
              className="m-auto w-full font-bold text-xl p-4 hover:bg-slate-500"
            >
              {d}
            </button>
          ))}
        </>
        :
        <>
          {/* Content of the HUD */}
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <p>{patient && patient.status.info}</p>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => closeMenu()} // Close the HUD
          >
            &times;
          </button>

          <button
            className="p-4 mt-4 m-auto w-full rounded-md bg-slate-400 hover:bg-slate-500"
            onClick={()=>diagnose()}
          >
            Diagnose
          </button>
        </>}
      </div>
    </div>
  ) : null;
};

export default PatientHud;
