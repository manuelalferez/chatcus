import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useStore = create(
  devtools(
    persist(
      (set) => ({
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
      }),
      {
        name: 'chatcus-storage',
        getStorage: () => sessionStorage,
      },
    ),
  ),
);

export default useStore;
