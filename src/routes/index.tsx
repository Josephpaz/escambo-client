import {Layout} from "@/components/ui/Layout";
import {Cadastro} from "@/features/Cadastro";
import {HistoricoTrocas} from "@/features/HistoricoTrocas";
// import { HomeWeb } from "@/features/HomeWeb";
import {CreatePost} from "@/features/post/CreatePost/CreatePost.page";
import {PostDetail} from "@/features/post/PostDetail/PostDetail";
import {BrowserRouter, Route, Routes} from "react-router";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PostFeed} from "@/features/post/PostFeed/PostFeed.page";
import {FavoriteList} from "@/features/post/FavoriteList/FavoriteList.page";
import {PostUserList} from "@/features/post/PostUserList/PostUserList.page";
import {EditPost} from "@/features/post/EditPost/EditPost.page";
import {AuthPage} from "@/features/auth/Auth.page";
import {useSessionStore} from "@/zustand";
import {useEffect} from "react";
import {UserService} from "@/service/user/index.service";

function SessionValidator() {
  const token = useSessionStore((s) => s.token);
  const user = useSessionStore((s) => s.user);
  const setUser = useSessionStore((s) => s.setUser);

  useEffect(() => {
    if (token && !user) {
      UserService.getByToken(token)
        .then((res) => setUser(res.data))
        .catch(() => UserService.getByToken(token));
    }
  }, [token, user]);

  return null;
}

export function AppRouter() {
  const queryClient = new QueryClient();

  const isLogged = useSessionStore((s) => s.token) !== null;
  console.log("isLogged:", isLogged);

  const publicRoutes = (
    <>
      <Route path="/" element={<AuthPage />} />
      <Route path="/register" element={<Cadastro />} />
    </>
  );

  const loggedRoutes = (
    <Route path="/" element={<Layout />}>
      <Route index element={<PostFeed />} />
      <Route path="history" index element={<HistoricoTrocas />} />
      <Route path="post" element={<CreatePost />} />
      <Route path="post/:id" element={<PostDetail />} />
      <Route path="post/:id/edit" element={<EditPost />} />
      <Route path="favorites" element={<FavoriteList />} />
      <Route path="user/posts" element={<PostUserList />} />
    </Route>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SessionValidator />
        <Routes>{isLogged ? loggedRoutes : publicRoutes}</Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
