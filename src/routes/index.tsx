import App from "@/App";
import { CreateProduct } from "@/features/product/CreateProduct/CreateProduct.page";
import { BrowserRouter, Route, Routes } from "react-router";

export function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/product" element={<CreateProduct/>} />
    </Routes>
    </BrowserRouter>
  )
}
