import {useMutation} from "@tanstack/react-query";
import {useSessionStore} from "@/zustand";
import {toaster} from "@/components/ui/toaster";
import {useNavigate} from "react-router-dom";
import {UserService} from "@/service/user/index.service";
import {AuthService} from "@/service/auth/index.service";

export function useAuth() {
  const setToken = useSessionStore((s) => s.setToken);
  const setUser = useSessionStore((s) => s.setUser);
  const reset = useSessionStore((s) => s.reset);
  const navigate = useNavigate();

  const getMe = useMutation({
    mutationFn: UserService.getByToken,
    onSuccess: (res) => {
      setUser(res.data);
      navigate("/");
    },
    onError: () => {
      toaster.create({
        title: "Erro ao buscar usuário",
        description: "Token inválido ou expirado.",
        type: "error",
      });
    },
  });

  const login = useMutation({
    mutationFn: AuthService.login,
    onSuccess: async (res) => {
      const {token} = res.data;
      reset();
      setToken(token);
      toaster.create({
        title: "Login realizado com sucesso",
        type: "success",
      });
      await getMe.mutateAsync(token);
    },
    onError: () => {
      toaster.create({
        title: "Erro ao fazer login",
        description: "Credenciais incorretas.",
        type: "error",
      });
    },
  });

  return {login, isLoading: login.isPending || getMe.isPending};
}
