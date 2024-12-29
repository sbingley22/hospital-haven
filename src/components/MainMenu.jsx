import { useGameStore } from '../useGameStore.js';

function MainMenu() {
  const { setMode, options, setOptions, highScore } = useGameStore();

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
    <div 
      className="flex flex-col w-full h-screen justify-evenly bg-slate-900"
      style={{ backgroundImage: "url('./stills/menu1.png')" }}
    >
      <div className='m-4 p-4 w-2/5 rounded-lg' style={{ backgroundColor: "rgba(250,200,100,0.9"}}>
        <h1 className="text-5xl font-bold">Hospital Haven</h1>

        <div className='text-3xl m-4 p-2 text-center'>
          <p>Save as many patients as you can whilst fighting off the zombies. Time your shots to the red flashes and build a combo. Use the diagnosis machine to pay for tests. Once you are confident of a DX interact with the patient to make a DX.</p>
          <p className='pt-4'>Space = Interact / Shoot</p>
          <p>WASD = Move</p>
        </div>

        <p className='text-3xl font-bold'>
          Most Patients Saved: {highScore}
        </p>

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
    </div>
  );
}

export default MainMenu;
