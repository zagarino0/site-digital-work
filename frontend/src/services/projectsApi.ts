import { apiUrl, API_URL } from "../config/api";

export { API_URL };

/* =========================================================
   TYPES
========================================================= */

export interface Project {
  id: string;

  title: string;
  short_title: string | null;

  description: string;
  details: string | null;

  category: string;

  image_url: string | null;

  technologies: string[];
  benefits: string[];

  project_url: string | null;
  demo_url: string | null;

  featured: boolean;
  published?: boolean;

  status:
    | "completed"
    | "in-progress"
    | "maintenance";

  created_at: string;
  updated_at: string;
}

export interface ProjectPayload {
  title: string;

  description: string;

  category: string;

  image_url?: string | null;

  project_url?: string | null;

  demo_url?: string | null;

  technologies?: string[];

  benefits?: string[];

  featured?: boolean;

  published?: boolean;

  short_title?: string | null;

  details?: string | null;

  status?:
    | "completed"
    | "in-progress"
    | "maintenance";
}

interface ApiResponse<T = unknown> {
  success: boolean;

  data?: T;

  message?: string;

  errors?: unknown;
}

/* =========================================================
   AUTHENTICATION
========================================================= */

function getAuthToken(): string | null {
  /*
   * Clé utilisée actuellement par AdminLogin.tsx
   */
  const token = localStorage.getItem(
    "digital-work-admin-token"
  );

  if (token) {
    return token;
  }

  /*
   * Compatibilité avec d'anciennes sessions.
   */
  const possibleKeys = [
    "token",
    "authToken",
    "accessToken",
    "jwt",
    "adminToken",
    "digital_work_token",
  ];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);

    if (value) {
      return value;
    }
  }

  return null;
}

/* =========================================================
   JSON HEADERS
========================================================= */

function getJsonHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const token = getAuthToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/* =========================================================
   MULTIPART HEADERS
========================================================= */

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  const token = getAuthToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  /*
   * NE PAS mettre Content-Type.
   *
   * Le navigateur doit générer automatiquement :
   *
   * multipart/form-data; boundary=...
   */
  return headers;
}

/* =========================================================
   RESPONSE PARSER
========================================================= */

async function parseResponse<T>(
  response: Response
): Promise<T> {
  let data: ApiResponse<T> | null = null;

  try {
    data =
      (await response.json()) as ApiResponse<T>;
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401) {
      /*
       * Si le token est expiré/invalide,
       * on nettoie la session.
       */
      localStorage.removeItem(
        "digital-work-admin-token"
      );

      localStorage.removeItem(
        "digital-work-admin"
      );

      throw new Error(
        "Authentification requise. Votre session administrateur a peut-être expiré."
      );
    }

    if (response.status === 403) {
      throw new Error(
        "Accès refusé. Vous devez disposer des droits administrateur."
      );
    }

    if (response.status === 404) {
      throw new Error(
        data?.message ??
          "Route API introuvable."
      );
    }

    throw new Error(
      data?.message ??
        `Erreur API (${response.status}).`
    );
  }

  if (
    data &&
    typeof data === "object" &&
    data.success === false
  ) {
    throw new Error(
      data.message ??
        "La requête API a échoué."
    );
  }

  return data?.data as T;
}

/* =========================================================
   GET PROJECTS
========================================================= */

export async function fetchProjects(): Promise<
  Project[]
> {
  const response = await fetch(
    apiUrl("/api/projects"),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  return parseResponse<Project[]>(
    response
  );
}

/* =========================================================
   GET PROJECT BY ID
========================================================= */

export async function fetchProjectById(
  id: string
): Promise<Project> {
  if (!id) {
    throw new Error(
      "Identifiant du projet manquant."
    );
  }

  const response = await fetch(
    apiUrl(`/api/projects/${encodeURIComponent(id)}`),
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  return parseResponse<Project>(
    response
  );
}

/* =========================================================
   CREATE PROJECT
========================================================= */

export async function createProject(
  payload: ProjectPayload
): Promise<Project> {
  const response = await fetch(
    apiUrl("/api/projects"),
    {
      method: "POST",
      headers: getJsonHeaders(),
      body: JSON.stringify(payload),
    }
  );

  return parseResponse<Project>(
    response
  );
}

/* =========================================================
   UPDATE PROJECT
========================================================= */

export async function updateProject(
  id: string,
  payload: ProjectPayload
): Promise<Project> {
  if (!id) {
    throw new Error(
      "Identifiant du projet manquant."
    );
  }

  const response = await fetch(
    apiUrl(`/api/projects/${encodeURIComponent(id)}`),
    {
      method: "PUT",
      headers: getJsonHeaders(),
      body: JSON.stringify(payload),
    }
  );

  return parseResponse<Project>(
    response
  );
}

/* =========================================================
   DELETE PROJECT
========================================================= */

export async function deleteProject(
  id: string
): Promise<void> {
  if (!id) {
    throw new Error(
      "Identifiant du projet manquant."
    );
  }

  const response = await fetch(
    apiUrl(`/api/projects/${encodeURIComponent(id)}`),
    {
      method: "DELETE",
      headers: getJsonHeaders(),
    }
  );

  await parseResponse<unknown>(response);
}

/* =========================================================
   UPLOAD PROJECT IMAGE
========================================================= */

export interface UploadedProjectImage {
  filename: string;

  url: string;

  image_url?: string;

  size: number;

  mimetype: string;
}

export async function uploadProjectImage(
  file: File
): Promise<UploadedProjectImage> {
  if (!file) {
    throw new Error(
      "Aucune image sélectionnée."
    );
  }

  const formData = new FormData();

  /*
   * IMPORTANT :
   *
   * Le backend attend :
   *
   * uploadProjectImage.single("image")
   */
  formData.append("image", file);

  const response = await fetch(
    apiUrl("/api/uploads/project"),
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    }
  );

  return parseResponse<UploadedProjectImage>(
    response
  );
}

/* =========================================================
   IMAGE URL
========================================================= */

export function getProjectImageUrl(
  imageUrl:
    | string
    | null
    | undefined
): string {
  if (!imageUrl) {
    return "";
  }

  const value = imageUrl.trim();

  if (!value) {
    return "";
  }

  /*
   * URL externe
   */
  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  /*
   * URL backend :
   *
   * /uploads/projects/file.jpg
   */
  if (value.startsWith("/")) {
    return `${API_URL}${value}`;
  }

  /*
   * uploads/projects/file.jpg
   */
  return `${API_URL}/${value}`;
}