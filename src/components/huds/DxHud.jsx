import { useGameStore } from "../../useGameStore"

const DxHud = () => {
  const { setPaused, patient, dx, setDxPurchased, dxHud, setDxHud, score, addScore } = useGameStore()

  const closeMenu = () => {
    setDxHud(false)
    setPaused(false)
  }

  const orderTest = (test) => {
    const cost = dx[test].price
    if (score >= cost) {
      setDxPurchased(test)
      addScore(-cost)
    }
  }

  return dxHud ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-4/5 max-w-md">
        <h2 className="text-xl font-semibold mb-4">Diagnostic Tests</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => closeMenu()}
        >
          &times;
        </button>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            {Object.keys(dx).map((d, index) => (
              !dx[d].purchased && <button 
                key={d+index}
                className="w-full text-left"
                onClick={() => orderTest(d)}
              >
                {d + ': ' + dx[d].price}
              </button>
            ))}
          </div>
          <div className="col-span-2">
            {Object.keys(dx).map((d, index) => (
              <p key={d+index}>
                {dx[d].purchased && patient.tests[d]}
              </p>
            ))}
          </div>
        </div>

      </div>
    </div>
  ) : null
}

export default DxHud
