import {create} from "zustand";
import {persist} from "zustand/middleware";

type SessionToken = {
  token: string | null;
  setToken: ({token}: {token: string}) => void;
  clearToken: () => void;
};

export const UseSessionToken = create<SessionToken>()(
  persist(
    (set) => ({
      token: null,
      setToken: ({token}) => set({token}),
      clearToken: () => set({token: null}),
    }),
    {
      name: "session-token",
    }
  )
);
