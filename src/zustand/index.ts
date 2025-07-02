import {UserService} from "@/service/user/index.service";
import {create} from "zustand";
import {persist} from "zustand/middleware";

type SessionToken = {
  token: string | null;
  setToken: ({token}: {token: string | null}) => void;
  clearToken: () => void;
};

type SessionUser = {
  user: UserService.GetUser;
  setUser: (user: UserService.GetUser) => void;
  clearUser: () => void;
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

export const UseSessionUser = create<SessionUser>()(
  persist(
    (set) => ({
      user: {
        email: "",
        id: "",
        nome: "",
        telefone: "",
      },
      setUser: (user: UserService.GetUser) => set({user}),
      clearUser: () => set({user: {email: "", id: "", nome: "", telefone: ""}}),
    }),
    {
      name: "session-user",
    }
  )
);
