import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { Home } from "./pages/Home";

// Loaded on demand so the Home page doesn't pull in the Supabase client.
const Explore = lazy(() =>
  import("./pages/Explore").then((module) => ({ default: module.Explore })),
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
