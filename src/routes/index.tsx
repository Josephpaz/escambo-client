// import App from "@/App";
import {Layout} from "@/components/ui/Layout";
import {Favoritos} from "@/features/Favoritos";
import {HistoricoTrocas} from "@/features/HistoricoTrocas";
// import { HomeWeb } from "@/features/HomeWeb";
import {CreateProduct} from "@/features/product/CreateProduct/CreateProduct.page";
import {BrowserRouter, Route, Routes} from "react-router";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="product" element={<CreateProduct />} />
          <Route path="history" element={<HistoricoTrocas />} />
          <Route path="favorits" element={<Favoritos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
