import { useGameStore } from '../useGameStore.js';

function MainMenu() {
  const { setMode, options, setOptions } = useGameStore();

  const handleVolumeChange = (e) => {
    setOptions({ volume: parseFloat(e.target.value) });
  };

  const handleMuteToggle = () => {
    setOptions({ mute: !options.mute });
  };

  const handleResolutionChange = (e) => {
    setOptions({ resolution: parseFloat(e.target.value) });
  };

  const handleInvincibleToggle = () => {
    setOptions({ invincible: !options.invincible });
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-evenly bg-yellow-500">
      <h1 className="text-5xl font-bold">Hospital Haven</h1>

      <button 
        className="rounded-2xl text-xl font-bold m-6 p-4 border-2 border-green-800 bg-yellow-300"
        onClick={() => setMode(0)}
      >
        Play
      </button>

      <div className="flex flex-col items-start gap-4 p-6 bg-yellow-300 rounded-lg shadow-md">
        <label className="flex items-center gap-2">
          <span className="text-lg">Volume:</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={options.volume}
            onChange={handleVolumeChange}
          />
          <span>{options.volume.toFixed(1)}</span>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-lg">Mute:</span>
          <button 
            className={`px-4 py-2 rounded ${options.mute ? 'bg-red-500' : 'bg-green-500'}`}
            onClick={handleMuteToggle}
          >
            {options.mute ? 'Unmute' : 'Mute'}
          </button>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-lg">Resolution:</span>
          <input 
            type="range" 
            min="0.2" 
            max="2" 
            step="0.1" 
            value={options.resolution}
            onChange={handleResolutionChange}
          />
          <span>{options.resolution.toFixed(1)}</span>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-lg">Invincible:</span>
          <button 
            className={`px-4 py-2 rounded ${options.invincible ? 'bg-green-500' : 'bg-red-500'}`}
            onClick={handleInvincibleToggle}
          >
            {options.invincible ? 'Enabled' : 'Disabled'}
          </button>
        </label>
      </div>
    </div>
  );
}

export default MainMenu;
