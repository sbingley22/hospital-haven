import { create } from "zustand"
import { dxTemplate, upgradeTemplate } from "./assets/Diagnostics"

const gamepadState = {
  moveX: 0,
  moveY: 0,
  interact: false,
}

export const useGameStore = create((set, get) => ({
  getGamepad: () => gamepadState,

  mode: 5,
  setMode: (mode) => set({ mode }),

  options: {
    volume: 0.5,
    mute: false,
    useController: true,
    resolution: 1.0,
    invincible: false,
  },
  setOptions: (newOptions) => set((state) => ({
    options: { ...state.options, ...newOptions },
  })),
  getVolume: () => get().options.volume,
  getMute: () => get().options.mute,

  player: null,
  setPlayer: (player) => set({ player }),
  setPlayerFlag: (flag, value) => {
    const state = get()
    if (state.player.current) state.player.current[flag] = value
  },
  
  enemyGroup: null,
  setEnemyGroup: (enemyGroup) => set({ enemyGroup }),
  enemies: [],
  setEnemies: (enemies) => set({ enemies }),
  enemiesRemove: (id) => {
    set((state) => ({
    enemies: state.enemies.filter(e => e.id !== id)
  }));
  },
  enemiesAdd: (newEnemies) => {
    const state = get()
    const tempE = [...state.enemies]
    newEnemies.forEach(e=>{
      tempE.push({
        id: e.id,
        type: e.type,
        position: e.position,
      })
    })
    set({ enemies: tempE })
  },
  enemyAdd: (id, type, position) => {
    const state = get()
    const tempE = [...state.enemies]
    tempE.push({
      id: id,
      type: type,
      position: position,
    })
    set({ enemies: tempE })
  },

  score: 500,
  setScore: (score) => set({ score }),
  addScore: (amount) => {
    const state = get()
    const newScore = state.score + amount
    set({ score: newScore })
  },
  getScore: () => get().score,
  
  hudInfo: {
    playerHealth: 100,
    patientHealth: 40,
    msg: "",
    combo: 0,
    shine: false,
  },
  setHudInfo: (hudInfo) => set({ hudInfo }),
  setHudInfoParameter: (newParameter) => set((state) => ({
    hudInfo: { ...state.hudInfo, ...newParameter },
  })),

  paused: false,
  setPaused: (paused) => set({ paused }),

  patientHud: false,
  setPatientHud: (patientHud) => set({ patientHud }),
  dxHud: false,
  setDxHud: (dxHud) => set({ dxHud }),
  bookHud: false,
  setBookHud: (bookHud) => set({ bookHud }),
  upgradeHud: false,
  setUpgradeHud: (upgradeHud) => set({ upgradeHud }),

  patient: null,
  setPatient: (patient) => set({ patient }),
  patientCured: null,
  setPatientCured: (patientCured) => set({ patientCured }),
  patientsSaved: 0,
  setPatientsSaved: (patientsSaved) => set({ patientsSaved }),
  addPatientsSaved: (amount) => {
    const state = get()
    const newSaved = state.patientsSaved + amount
    set({ patientsSaved: newSaved })
  },

  highScore: 0,
  setHighScore: (highScore) => set({ highScore }),
  newHighScore: () => {
    const state = get()
    if (state.patientsSaved > state.highScore) set({ highScore: state.patientsSaved })
  },

  dx: dxTemplate,
  setDx: (dx) => set({ dx }),
  setDxParameter: (newParameter) => set((state) => ({
    dx: { ...state.dx, ...newParameter },
  })),
  setDxPurchased: (itemName) => set((state) => ({
    dx: {
      ...state.dx,
      [itemName]: {
        ...state.dx[itemName],
        purchased: true,
      },
    },
  })),
  resetDx: () => set({ dx: dxTemplate }),

  upgrades: upgradeTemplate,
  setUpgrades: (upgrades) => set({ upgrades }),
  setUpgradesParameter: (newParameter) => set((state) => ({
    upgrades: { ...state.upgrades, ...newParameter },
  })),
  setUpgradesPurchased: (itemName) => set((state) => ({
    upgrades: {
      ...state.upgrades,
      [itemName]: {
        ...state.upgrades[itemName],
        purchased: true,
      },
    },
  })),
  resetUpgrades: () => set({ upgrades: upgradeTemplate}),

  resetGame: () => {
    set({
      score: 500,
      player: null,
      hudInfo: {
        playerHealth: 100,
        patientHealth: 40,
        combo: 0,
        msg: "",
        shine: false,
      },
      paused: false,
      patientHud: false,
      dxHud: false,
      bookHud: false,
      upgradeHud: false,
      patient: null,
      patientCured: null,
      patientsSaved: 0,
      dx: dxTemplate,
      upgrades: upgradeTemplate,
      enemyGroup: null,
      enemies: [],
    });
  },

}))
