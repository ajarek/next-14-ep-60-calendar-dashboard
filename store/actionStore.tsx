import { create } from 'zustand'

interface ActionState {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useActionStore = create<ActionState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))