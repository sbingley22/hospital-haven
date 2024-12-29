import { useGameStore } from "../../useGameStore";

const UpgradeHud = () => {
  const { setPaused, upgrades, setUpgradesPurchased, upgradeHud, setUpgradeHud, score, addScore } = useGameStore()

  const closeMenu = () => {
    setUpgradeHud(false)
    setPaused(false)
  }

  const orderUpgrade = (upgrade) => {
    const cost = upgrades[upgrade].price;
    if (score >= cost) {
      setUpgradesPurchased(upgrade);
      addScore(-cost);
    }
  }

  return upgradeHud ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-4/5 max-w-5xl h-4/5 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Upgrades</h2>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => closeMenu()}
        >
          &times;
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 grid grid-cols-2 gap-2">
            {Object.keys(upgrades).map((d, index) => (
              !upgrades[d].purchased && (
                <button
                  key={d + index}
                  className="text-left mb-2 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  onClick={() => orderUpgrade(d)}
                >
                  {d + ': $' + upgrades[d].price}
                </button>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default UpgradeHud