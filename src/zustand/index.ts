import {create} from "zustand";
import {persist} from "zustand/middleware";

type User = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
};

type SessionState = {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  reset: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({token}),
      setUser: (user) => set({user}),
      reset: () => set({token: null, user: null}),
    }),
    {
      name: "session-storage", // chave do localStorage
    }
  )
);
