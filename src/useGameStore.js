import { create } from "zustand"
import { dxTemplate } from "./assets/Diagnostics"

const gamepadState = {
  moveX: 0,
  moveY: 0,
  interact: false,
}

export const useGameStore = create((set, get) => ({
  getGamepad: () => gamepadState,

  mode: 0,
  setMode: (mode) => set({ mode }),

  options: {
    volume: 0.5,
    mute: false,
    useController: true,
    resolution: 1.0,
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

  score: 350,
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

  patient: null,
  setPatient: (patient) => set({ patient }),

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

  resetGame: () => {
    set({
      score: 50,
      player: null,
      hudInfo: {
        playerHealth: 100,
        patientHealth: 40,
        msg: "",
      },
      paused: false,
      patientHud: false,
      dxHud: false,
      patient: null,
      dx: dxTemplate,
    });
  },

}))
