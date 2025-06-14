// import App from "@/App";
import {Layout} from "@/components/ui/Layout";
import {Cadastro} from "@/features/Cadastro";
import {Favoritos} from "@/features/Favoritos";
import {HistoricoTrocas} from "@/features/HistoricoTrocas";
// import { HomeWeb } from "@/features/HomeWeb";
import {CreatePost} from "@/features/post/CreatePost/CreatePost.page";
import {PostDetail} from "@/features/post/PostDetail/PostDetail";
import {BrowserRouter, Route, Routes} from "react-router";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PostFeed} from "@/features/post/PostFeed/PostFeed.page";

export function AppRouter() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PostFeed />} />
            <Route path="history" index element={<HistoricoTrocas />} />
            <Route path="post" element={<CreatePost />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="favorits" element={<Favoritos />} />
          </Route>
          <Route path="register" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
