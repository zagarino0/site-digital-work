import { apiUrl } from "../config/api";

const TOKEN_KEY = "digital-work-admin-token";

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
  published: boolean;

  status:
    | "completed"
    | "in-progress"
    | "maintenance";

  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  success: boolean;

  data?: T;

  message?: string;
}

/* =========================================================
   AUTHENTICATION
========================================================= */

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function adminLogout(): void {
  localStorage.removeItem(TOKEN_KEY);

  localStorage.removeItem(
    "digital-work-admin"
  );
}

/* =========================================================
   REQUEST
========================================================= */

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAdminToken();

  const headers = new Headers(
    options.headers
  );

  headers.set(
    "Content-Type",
    "application/json"
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const response = await fetch(
    apiUrl(path),
    {
      ...options,
      headers,
    }
  );

  const data =
    (await response.json()) as ApiResponse<T>;

  if (!response.ok || !data.success) {
    if (response.status === 401) {
      adminLogout();

      window.location.href =
        `${import.meta.env.BASE_URL}admin/login`;
    }

    throw new Error(
      data.message ??
        "Une erreur est survenue."
    );
  }

  return data.data as T;
}

/* =========================================================
   GET PROJECTS
========================================================= */

export function getProjects() {
  return request<Project[]>(
    "/api/projects"
  );
}

/* =========================================================
   GET PROJECT
========================================================= */

export function getProject(
  id: string
) {
  return request<Project>(
    `/api/projects/${encodeURIComponent(id)}`
  );
}

/* =========================================================
   CREATE PROJECT
========================================================= */

export function createProject(
  data: Omit<
    Project,
    "id" |
      "created_at" |
      "updated_at"
  >
) {
  return request<Project>(
    "/api/projects",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

/* =========================================================
   UPDATE PROJECT
========================================================= */

export function updateProject(
  id: string,
  data: Partial<
    Omit<
      Project,
      "id" |
        "created_at" |
        "updated_at"
    >
  >
) {
  return request<Project>(
    `/api/projects/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

/* =========================================================
   DELETE PROJECT
========================================================= */

export function deleteProject(
  id: string
) {
  return request<void>(
    `/api/projects/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );
}

/* =========================================================
   UPLOAD PROJECT IMAGE
========================================================= */

export interface UploadResponse {
  filename: string;

  url: string;

  size: number;

  mimetype: string;
}

export async function uploadProjectImage(
  file: File
): Promise<UploadResponse> {
  const token = getAdminToken();

  if (!token) {
    throw new Error(
      "Session administrateur inexistante."
    );
  }

  const formData = new FormData();

  formData.append(
    "image",
    file
  );

  const response = await fetch(
    apiUrl("/api/uploads/project"),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data =
    (await response.json()) as {
      success: boolean;
      data?: UploadResponse;
      message?: string;
    };

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ??
        "Impossible d'envoyer l'image."
    );
  }

  if (!data.data) {
    throw new Error(
      "Réponse upload invalide."
    );
  }

  return data.data;
}