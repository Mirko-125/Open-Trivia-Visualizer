import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TriviaProvider } from "./context";
import { Loader } from "./components/ui";
import App from "./App.jsx";
import "./index.css";

const MainTitle = lazy(() => import("./pages/main-title/main-title"));
const DistributionCategory = lazy(() =>
  import("./pages/distribution-category/distribution-category")
);
const DistributionDifficulty = lazy(() =>
  import("./pages/distribution-difficulty/distribution-difficulty")
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TriviaProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<MainTitle />} />
              <Route path="main-title" element={<MainTitle />} />
              <Route path="main-title/:category" element={<MainTitle />} />
              <Route
                path="distribution/category"
                element={<DistributionCategory />}
              />
              <Route
                path="distribution/difficulty"
                element={<DistributionDifficulty />}
              />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
          </Routes>
        </Suspense>
      </TriviaProvider>
    </BrowserRouter>
  </StrictMode>
);
