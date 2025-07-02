// import App from "@/App";
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
import {UseSessionToken} from "@/zustand";
import {AuthPage} from "@/features/auth/Auth.page";

export function AppRouter() {
  const queryClient = new QueryClient();

  const isLogged = UseSessionToken((state) => state.token) !== null;
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
        <Routes>{isLogged ? loggedRoutes : publicRoutes}</Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
