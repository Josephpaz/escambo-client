import {create} from "zustand";

type SessionToken = {
  token: string;
};

export const UseSessionToken = create((set) => ({
  token: null,
  setToken: ({token}: SessionToken) => set({token}),
}));
