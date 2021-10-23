import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    name: '',
    room: '',
    pfpSrc: '',
    roommates: [],
    messages: [],

    setName: (name) => set({ name }),
    setRoom: (room) => set({ room }),
    setPfpSrc: (pfpSrc) => set({ pfpSrc }),

    setRoommates: (roommates) => set((state) => ({ roommates })),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

    resetStore: () => set((state) => ({ name: '', room: '', pfpSrc: '', roommates: [], messages: [] })),
  })),
);

export default useStore;
