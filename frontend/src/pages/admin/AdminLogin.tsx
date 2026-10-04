import { useState } from "react";

import type { FormEvent } from "react";

import {
  ArrowRight,
  Lock,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import Button from "../../components/ui/Button";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";
import { apiUrl } from "../../config/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        apiUrl("/api/auth/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ??
            "Impossible de se connecter."
        );
      }

      const token = data.data?.token;

      if (!token) {
        throw new Error(
          "Token d'authentification absent."
        );
      }

      /* =====================================================
         STOCKAGE SESSION ADMIN
      ===================================================== */

      localStorage.setItem(
        "digital-work-admin-token",
        token
      );

      if (data.data?.admin) {
        localStorage.setItem(
          "digital-work-admin",
          JSON.stringify(data.data.admin)
        );
      }

      /* =====================================================
         REDIRECTION DASHBOARD
      ===================================================== */

      navigate("/admin", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Erreur connexion admin:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-dw-background
        px-5
        py-16
      "
    >
      <div className="fixed right-5 top-5 z-10">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-md">

        {/* ===================================================
            LOGIN CARD
        ==================================================== */}

        <div
          className="
            rounded-3xl
            border
            border-dw-border
            bg-dw-card
            p-8
            shadow-2xl
            shadow-black/10
          "
        >

          {/* =================================================
              LOGO / BRAND
          ================================================== */}

          <div className="mb-8 flex flex-col items-center text-center">

            <img
              src={logo}
              alt="Digital Work"
              className="
                h-16
                w-16
                object-contain
              "
            />

            <div className="mt-4 leading-none">
              <div
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-dw-white
                "
              >
                Digital
                <span className="text-dw-primary">
                  Work
                </span>
              </div>

              <div
                className="
                  mt-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-dw-muted
                "
              >
                Solutions digitales
              </div>
            </div>

            <div className="mt-6">
              <h1
                className="
                  text-xl
                  font-semibold
                  text-dw-text
                "
              >
                Administration
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-dw-muted
                "
              >
                Connectez-vous pour accéder
                à votre espace d'administration.
              </p>
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================== */}

          {error && (
            <div
              role="alert"
              className="
                mb-5
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-sm
                leading-5
                text-red-500
              "
            >
              {error}
            </div>
          )}

          {/* =================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =================================================
                USERNAME
            ================================================== */}

            <div>
              <label
                htmlFor="username"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-dw-text
                "
              >
                Nom d'utilisateur
              </label>

              <div className="relative">
                <User
                  size={17}
                  aria-hidden="true"
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-dw-muted
                  "
                />

                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  placeholder="admin"
                  required
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-dw-border
                    bg-dw-surface
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-dw-text
                    outline-none
                    placeholder:text-dw-muted/60
                    transition
                    focus:border-dw-primary
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>
            </div>

            {/* =================================================
                PASSWORD
            ================================================== */}

            <div>
              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-dw-text
                "
              >
                Mot de passe
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  aria-hidden="true"
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-dw-muted
                  "
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Votre mot de passe"
                  required
                  disabled={loading}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-dw-border
                    bg-dw-surface
                    py-3
                    pl-10
                    pr-4
                    text-sm
                    text-dw-text
                    outline-none
                    placeholder:text-dw-muted/60
                    transition
                    focus:border-dw-primary
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() =>
                  navigate("/admin/forgot-password")
                }
                disabled={loading}
                className="text-xs font-medium text-dw-muted transition hover:text-dw-text disabled:opacity-60"
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* =================================================
                SUBMIT
            ================================================== */}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Connexion..."
                : "Se connecter"}

              {!loading && (
                <ArrowRight size={17} />
              )}
            </Button>
          </form>

          {/* =================================================
              SECURITY MESSAGE
          ================================================== */}

          <div
            className="
              mt-6
              border-t
              border-dw-border
              pt-5
              text-center
            "
          >
            <p
              className="
                text-[11px]
                leading-5
                text-dw-muted
              "
            >
              Accès réservé aux administrateurs
              autorisés.
            </p>
          </div>
        </div>

        {/* ===================================================
            COPYRIGHT
        ==================================================== */}

        <p
          className="
            mt-6
            text-center
            text-xs
            text-dw-muted
          "
        >
          © {new Date().getFullYear()} Digital Work
        </p>
      </div>
    </main>
  );
}
