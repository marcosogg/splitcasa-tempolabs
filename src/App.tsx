import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import { AuthModal } from "./components/auth/AuthModal";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import routes from "tempo-routes";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {!user ? (
          <AuthModal />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </>
        )}
      </>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
