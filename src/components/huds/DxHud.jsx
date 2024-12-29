import { useGameStore } from "../../useGameStore";

const DxHud = () => {
  const { setPaused, patient, dx, setDxPurchased, dxHud, setDxHud, score, addScore } = useGameStore();

  const closeMenu = () => {
    setDxHud(false);
    setPaused(false);
  };

  const orderTest = (test) => {
    const cost = dx[test].price;
    if (score >= cost) {
      setDxPurchased(test);
      addScore(-cost);
    }
  };

  return dxHud ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-4/5 max-w-5xl h-4/5 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Diagnostic Tests</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => closeMenu()}
        >
          &times;
        </button>

        <div className="grid grid-cols-3 gap-4">
          {/* Column for Test Results */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-2">Test Results</h3>
            {Object.keys(dx).map((d, index) => (
              dx[d].purchased && (
                <p key={d + index} className="mb-2">
                  {patient.tests[d]}
                </p>
              )
            ))}
          </div>

          {/* Columns for Diagnostic Tests */}
          <div className="col-span-2 grid grid-cols-2 gap-2">
            {Object.keys(dx).map((d, index) => (
              !dx[d].purchased && (
                <button
                  key={d + index}
                  className="text-left mb-2 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  onClick={() => orderTest(d)}
                >
                  {d + ': $' + dx[d].price}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default DxHud;
