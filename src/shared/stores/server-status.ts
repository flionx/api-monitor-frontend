import { create } from "zustand";

interface ServerStatusState {
    isWaking: boolean;
    setWaking: (value: boolean) => void;
}

export const useServerStatus = create<ServerStatusState>((set) => ({
    isWaking: false,
    setWaking: (isWaking) => set({ isWaking })
}));
