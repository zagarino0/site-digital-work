import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Solutions from "./pages/Solutions";
import Realisations from "./pages/Realisations";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import { MessageCircle } from "lucide-react";
import ProjectForm from "./pages/admin/ProjectForm";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="dw-site-shell flex min-h-screen flex-col text-dw-text">
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/projects/new"
            element={
              <AdminProtectedRoute>
                <ProjectForm />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/projects/:id/edit"
            element={
              <AdminProtectedRoute>
                <ProjectForm />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      {!isAdminRoute && (
        <a
          href="https://wa.me/2610348428652"
          target="_blank"
          rel="noreferrer"
          aria-label="Contacter Digital Work sur WhatsApp"
          title="Contacter Digital Work sur WhatsApp"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_12px_30px_rgba(16,185,129,0.35)] transition duration-200 hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 sm:bottom-6 sm:right-6"
        >
          <MessageCircle size={25} strokeWidth={2.2} />
        </a>
      )}
    </div>
  );
}

export default App;
