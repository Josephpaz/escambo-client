import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "./components/ui/provider.tsx";
import "./index.css";
import {AppRouter} from "./routes/index.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Toaster} from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <AppRouter />
      <Toaster />
    </Provider>
  </StrictMode>
);
