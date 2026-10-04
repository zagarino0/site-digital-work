const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_URL =
  configuredApiUrl?.replace(/\/$/, "") ||
  (import.meta.env.PROD ? "" : "http://localhost:4000");

export function apiUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error(`Le chemin API doit commencer par "/": ${path}`);
  }

  if (!API_URL) {
    throw new Error(
      "API de production non configurée. Définissez VITE_API_URL dans les variables GitHub Pages."
    );
  }

  return `${API_URL}${path}`;
}
