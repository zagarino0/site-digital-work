import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import Button from "../../components/ui/Button";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";
import { apiUrl } from "../../config/api";

export default function AdminForgotPassword() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        apiUrl("/api/auth/forgot-password"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: identifier.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ??
            "Impossible d'envoyer la demande."
        );
      }

      setMessage(data.message);
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
              Mot de passe oublié
            </h1>

            <p className="mt-2 text-sm leading-6 text-dw-muted">
              Entrez votre nom d'utilisateur ou votre adresse e-mail.
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
                htmlFor="identifier"
                className="mb-2 block text-sm font-medium text-dw-text"
              >
                Identifiant ou e-mail
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  aria-hidden="true"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dw-muted"
                />

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={identifier}
                  onChange={(event) =>
                    setIdentifier(event.target.value)
                  }
                  placeholder="admin@digital-work..."
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-dw-border bg-dw-surface py-3 pl-10 pr-4 text-sm text-dw-text outline-none placeholder:text-dw-muted/60 transition focus:border-dw-primary disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Envoi..."
                : "Envoyer le lien"}

              {!loading && <ArrowRight size={17} />}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            className="mt-6 flex w-full items-center justify-center gap-2 border-t border-dw-border pt-5 text-xs font-medium text-dw-muted transition hover:text-dw-text"
          >
            <ArrowLeft size={14} />
            Retour à la connexion
          </button>
        </div>
      </div>
    </main>
  );
}
