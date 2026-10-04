import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/footer";
import ScrollControls from "./components/ui/ScrollControls";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Realisations from "./pages/Realisations";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import ProjectForm from "./pages/admin/ProjectForm";

function App() {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  return (
    <div className="dw-site-shell flex min-h-screen flex-col text-dw-text">
      {!isAdminRoute && (
        <>
          <div aria-hidden="true" className="dw-site-backdrop" />
          <div aria-hidden="true" className="dw-site-backdrop-overlay" />
        </>
      )}
      {/* =====================================================
          PUBLIC NAVBAR
      ===================================================== */}
      {!isAdminRoute && <Navbar />}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="flex-1">
        <Routes>
          {/* =================================================
              PUBLIC ROUTES
          ================================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/solutions"
            element={<Solutions />}
          />

          <Route
            path="/realisations"
            element={<Realisations />}
          />

          <Route
            path="/a-propos"
            element={<APropos />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* =================================================
              ADMIN LOGIN
          ================================================== */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* =================================================
              ADMIN DASHBOARD
          ================================================== */}

          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* =================================================
              CREATE PROJECT
          ================================================== */}

          <Route
            path="/admin/projects/new"
            element={
              <AdminProtectedRoute>
                <ProjectForm />
              </AdminProtectedRoute>
            }
          />

          {/* =================================================
              EDIT PROJECT

              ProjectForm récupère lui-même l'id avec
              useParams().
          ================================================== */}

          <Route
            path="/admin/projects/:id/edit"
            element={
              <AdminProtectedRoute>
                <ProjectForm />
              </AdminProtectedRoute>
            }
          />

          {/* =================================================
              FALLBACK
          ================================================== */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
      </main>

      {/* =====================================================
          SCROLL CONTROLS
      ===================================================== */}
      <ScrollControls />

      {/* =====================================================
          PUBLIC FOOTER
      ===================================================== */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;