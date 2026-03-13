import { create } from 'zustand'

export const useAppStore = create((set) => ({
  sceneLoaded: false,
  animationsReady: false,
  finished: false,
  setSceneLoaded: () => set({ sceneLoaded: true }),
  setAnimationsReady: () => set({ animationsReady: true }),
  setFinished: () => set({ finished: true }),
}))
