// import App from "@/App";
import { Layout } from "@/components/ui/Layout";
import { Cadastro } from "@/features/Cadastro";
import { Favoritos } from "@/features/Favoritos";
import { HistoricoTrocas } from "@/features/HistoricoTrocas";
// import { HomeWeb } from "@/features/HomeWeb";
import { CreatePost } from "@/features/post/CreatePost/CreatePost.page";
import { BrowserRouter, Route, Routes } from "react-router";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="post" element={<CreatePost />} />
          <Route path="history" element={<HistoricoTrocas />} />
          <Route path="favorits" element={<Favoritos />} />
          <Route path="register" element={<Cadastro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
