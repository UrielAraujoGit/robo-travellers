import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Home } from "./pages/Home";

// Loaded on demand so the Home page doesn't pull in the Supabase client.
const Explore = lazy(() =>
  import("./pages/Explore").then((module) => ({ default: module.Explore })),
);
const MissionRoute = lazy(() =>
  import("./pages/Mission").then((module) => ({
    default: module.MissionRoute,
  })),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/explore"
        element={
          <Suspense fallback={null}>
            <Explore />
          </Suspense>
        }
      />
      <Route
        path="/exoplanet/:id"
        element={
          <Suspense fallback={null}>
            <MissionRoute />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
