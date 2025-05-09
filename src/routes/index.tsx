// import App from "@/App";
import { HistoricoTrocas } from "@/features/HistoricoTrocas";
import { HomeWeb } from "@/features/HomeWeb";
import { CreatePost } from "@/features/post/CreatePost/CreatePost.page";
import { BrowserRouter, Route, Routes } from "react-router";

export function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeWeb/>} />
      <Route path="/product" element={<CreatePost/>} />
      <Route path="/history" element={<HistoricoTrocas/>} />
    </Routes>
    </BrowserRouter>
  )
}
