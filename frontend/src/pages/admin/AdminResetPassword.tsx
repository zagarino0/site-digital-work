import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import logo from "../../assets/logo.png";
import Button from "../../components/ui/Button";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";
import { apiUrl } from "../../config/api";

export default function AdminResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = useMemo(
    () => searchParams.get("token") ?? "",
    [searchParams]
  );

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Lien de réinitialisation invalide.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Le nouveau mot de passe doit contenir au moins 8 caractères."
      );
      return;
    }

    if (password !== confirmation) {
      setError(
        "Les deux mots de passe ne correspondent pas."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        apiUrl("/api/auth/reset-password"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ??
            "Impossible de réinitialiser le mot de passe."
        );
      }

      setMessage(data.message);

      window.setTimeout(() => {
        navigate("/admin/login", {
          replace: true,
        });
      }, 1800);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-dw-background px-5 py-16">
      <div className="fixed right-5 top-5 z-10">
        <ThemeSwitcher />
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-dw-border bg-dw-card p-8 shadow-2xl shadow-black/10">
          <div className="mb-8 flex flex-col items-center text-center">
            <img
              src={logo}
              alt="Digital Work"
              className="h-16 w-16 object-contain"
            />

            <h1 className="mt-6 text-xl font-semibold text-dw-text">
              Nouveau mot de passe
            </h1>

            <p className="mt-2 text-sm leading-6 text-dw-muted">
              Choisissez un nouveau mot de passe sécurisé.
            </p>
          </div>

          {message && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm leading-5 text-dw-text"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-500"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-dw-text"
              >
                Nouveau mot de passe
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  aria-hidden="true"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dw-muted"
                />

                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  minLength={8}
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-dw-border bg-dw-surface py-3 pl-10 pr-4 text-sm text-dw-text outline-none placeholder:text-dw-muted/60 transition focus:border-dw-primary disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmation"
                className="mb-2 block text-sm font-medium text-dw-text"
              >
                Confirmer le mot de passe
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  aria-hidden="true"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dw-muted"
                />

                <input
                  id="confirmation"
                  type="password"
                  autoComplete="new-password"
                  value={confirmation}
                  onChange={(event) =>
                    setConfirmation(event.target.value)
                  }
                  minLength={8}
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-dw-border bg-dw-surface py-3 pl-10 pr-4 text-sm text-dw-text outline-none placeholder:text-dw-muted/60 transition focus:border-dw-primary disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !token}
            >
              {loading
                ? "Réinitialisation..."
                : "Réinitialiser le mot de passe"}

              {!loading && <ArrowRight size={17} />}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
