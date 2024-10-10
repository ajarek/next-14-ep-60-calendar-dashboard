import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Item = {
  id: number
  date: string
  timeOn: string
  timeOff: string
  event: string
  type: string
}

type ItemState = {
  items: Item[]
  addItemToEvent: (item: Item) => void
  removeItemFromEvent: (id: number) => void
}

export const useEventsStore = create<ItemState>()(
  persist(
    (set) => ({
      items: [],

      addItemToEvent: (item: Item) =>
        set((state) => ({
          items: [item, ...state.items],
        })),

      removeItemFromEvent: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),

    { name: 'EventStore', storage: createJSONStorage(() => localStorage) }
  )
)