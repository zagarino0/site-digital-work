import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  Image as ImageIcon,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import Container from "../../components/ui/Container";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";

import {
  createProject,
  getProjectImageUrl,
  updateProject,
  uploadProjectImage,
} from "../../services/projectsApi";

import type {
  Project,
  ProjectPayload,
} from "../../services/projectsApi";

import {
  getProject as getAdminProject,
} from "../../services/adminApi";

import {
  PROJECT_CATEGORIES,
  getUniqueProjectCategories,
} from "../../constants/projectCategories";

/* =========================================================
   TYPES
========================================================= */

interface FormState {
  title: string;
  short_title: string;
  description: string;
  details: string;
  category: string;
  image_url: string;
  project_url: string;
  demo_url: string;
  technologies: string[];
  benefits: string[];
  featured: boolean;
  published: boolean;
  status: "completed" | "in-progress" | "maintenance";
}

/* =========================================================
   CONSTANTES
========================================================= */

const EMPTY_FORM: FormState = {
  title: "",
  short_title: "",
  description: "",
  details: "",
  category: "",
  image_url: "",
  project_url: "",
  demo_url: "",
  technologies: [],
  benefits: [],
  featured: false,
  published: true,
  status: "completed",
};

/* =========================================================
   HELPERS
========================================================= */

function normalizeCategory(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeArray(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

function projectToForm(project: Project): FormState {
  const published =
    project.published !== undefined
      ? Boolean(project.published)
      : project.status !== "maintenance";

  return {
    title: project.title ?? "",
    short_title: project.short_title ?? "",
    description: project.description ?? "",
    details: project.details ?? "",
    category: project.category ?? "",
    image_url: project.image_url ?? "",
    project_url: project.project_url ?? "",
    demo_url: project.demo_url ?? "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : [],
    benefits: Array.isArray(project.benefits)
      ? project.benefits
      : [],
    featured: Boolean(project.featured),
    published,
    status: project.status ?? "completed",
  };
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

/**
 * Une image peut être :
 *
 * https://example.com/image.jpg
 *
 * ou :
 *
 * /uploads/projects/image.jpg
 *
 * ou :
 *
 * uploads/projects/image.jpg
 */
function isValidImageReference(value: string): boolean {
  const normalized = value.trim();

  if (!normalized) {
    return true;
  }

  if (
    normalized.startsWith("/") ||
    normalized.startsWith("uploads/")
  ) {
    return true;
  }

  return isValidUrl(normalized);
}

/* =========================================================
   PAGE
========================================================= */

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEditMode = Boolean(id);

  /* =======================================================
     STATE
  ======================================================= */

  const [form, setForm] =
    useState<FormState>(EMPTY_FORM);

  const [loading, setLoading] =
    useState(isEditMode);

  const [saving, setSaving] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [technologyInput, setTechnologyInput] =
    useState("");

  const [benefitInput, setBenefitInput] =
    useState("");

  const [customCategory, setCustomCategory] =
    useState("");

  const [showCustomCategory, setShowCustomCategory] =
    useState(false);

  const [imagePreview, setImagePreview] =
    useState("");

  /* =======================================================
     CATEGORIES
  ======================================================= */

  const categories = useMemo(() => {
    const predefined = Array.isArray(PROJECT_CATEGORIES)
      ? PROJECT_CATEGORIES
      : [];

    const currentCategory = form.category
      ? [form.category]
      : [];

    return getUniqueProjectCategories([
      ...predefined,
      ...currentCategory,
    ]);
  }, [form.category]);

  /* =======================================================
     LOAD PROJECT
  ======================================================= */

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadProject() {
      try {
        setLoading(true);
        setError("");
        setSuccess("");

        const project =
          await getAdminProject(id);

        if (cancelled) {
          return;
        }

        if (!project) {
          setError("Projet introuvable.");
          return;
        }

        const nextForm =
          projectToForm(project);

        setForm(nextForm);

        setImagePreview(
          getProjectImageUrl(
            nextForm.image_url,
          ),
        );
      } catch (err) {
        console.error(
          "Erreur chargement projet:",
          err,
        );

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Impossible de charger le projet.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProject();

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* =======================================================
     FORM UPDATE
  ======================================================= */

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* =======================================================
     TECHNOLOGIES
  ======================================================= */

  function addTechnology() {
    const value =
      technologyInput.trim();

    if (!value) {
      return;
    }

    const exists =
      form.technologies.some(
        (technology) =>
          technology.toLowerCase() ===
          value.toLowerCase(),
      );

    if (!exists) {
      updateField(
        "technologies",
        [
          ...form.technologies,
          value,
        ],
      );
    }

    setTechnologyInput("");
  }

  function removeTechnology(index: number) {
    updateField(
      "technologies",
      form.technologies.filter(
        (_, currentIndex) =>
          currentIndex !== index,
      ),
    );
  }

  function handleTechnologyKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTechnology();
    }
  }

  /* =======================================================
     BENEFITS
  ======================================================= */

  function addBenefit() {
    const value =
      benefitInput.trim();

    if (!value) {
      return;
    }

    const exists =
      form.benefits.some(
        (benefit) =>
          benefit.toLowerCase() ===
          value.toLowerCase(),
      );

    if (!exists) {
      updateField(
        "benefits",
        [
          ...form.benefits,
          value,
        ],
      );
    }

    setBenefitInput("");
  }

  function removeBenefit(index: number) {
    updateField(
      "benefits",
      form.benefits.filter(
        (_, currentIndex) =>
          currentIndex !== index,
      ),
    );
  }

  function handleBenefitKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      event.preventDefault();
      addBenefit();
    }
  }

  /* =======================================================
     CATEGORY
  ======================================================= */

  function handleCategoryChange(
    value: string,
  ) {
    if (value === "__custom__") {
      setShowCustomCategory(true);
      return;
    }

    setShowCustomCategory(false);
    setCustomCategory("");

    updateField(
      "category",
      normalizeCategory(value),
    );
  }

  function addCustomCategory() {
    const value =
      normalizeCategory(
        customCategory,
      );

    if (!value) {
      return;
    }

    const existingCategory =
      categories.find(
        (category) =>
          category.toLowerCase() ===
          value.toLowerCase(),
      );

    updateField(
      "category",
      existingCategory ?? value,
    );

    setCustomCategory("");
    setShowCustomCategory(false);
  }

  function cancelCustomCategory() {
    setCustomCategory("");
    setShowCustomCategory(false);
  }

  /* =======================================================
     IMAGE UPLOAD
  ======================================================= */

  async function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    if (!file.type.startsWith("image/")) {
      setError(
        "Veuillez sélectionner une image valide.",
      );

      event.target.value = "";
      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "L'image ne doit pas dépasser 5 Mo.",
      );

      event.target.value = "";
      return;
    }

    const localPreview =
      URL.createObjectURL(file);

    setImagePreview(localPreview);

    try {
      setUploading(true);

      const uploaded =
        await uploadProjectImage(file);

      const imageUrl =
        uploaded.image_url ??
        uploaded.url ??
        "";

      if (!imageUrl.trim()) {
        throw new Error(
          "Le serveur n'a pas retourné le chemin de l'image.",
        );
      }

      updateField(
        "image_url",
        imageUrl.trim(),
      );

      setImagePreview(
        getProjectImageUrl(
          imageUrl,
        ),
      );

      setSuccess(
        "Image téléchargée avec succès. Elle sera enregistrée avec le projet.",
      );
    } catch (err) {
      console.error(
        "Erreur upload image:",
        err,
      );

      setImagePreview(
        getProjectImageUrl(
          form.image_url,
        ),
      );

      setError(
        err instanceof Error
          ? err.message
          : "Impossible de télécharger l'image.",
      );
    } finally {
      setUploading(false);

      URL.revokeObjectURL(
        localPreview,
      );

      event.target.value = "";
    }
  }

  /* =======================================================
     IMAGE REMOVE
  ======================================================= */

  function removeImage() {
    updateField(
      "image_url",
      "",
    );

    setImagePreview("");
  }

  /* =======================================================
     VALIDATION
  ======================================================= */

  function validateForm(): string | null {
    const title =
      form.title.trim();

    const shortTitle =
      form.short_title.trim();

    const description =
      form.description.trim();

    const details =
      form.details.trim();

    const category =
      normalizeCategory(
        form.category,
      );

    const imageUrl =
      form.image_url.trim();

    if (!title) {
      return "Le titre du projet est obligatoire.";
    }

    if (title.length < 2) {
      return "Le titre du projet est trop court.";
    }

    if (shortTitle.length > 150) {
      return "Le titre court ne doit pas dépasser 150 caractères.";
    }

    if (!description) {
      return "La description du projet est obligatoire.";
    }

    if (description.length < 10) {
      return "La description du projet est trop courte.";
    }

    if (!category) {
      return "Veuillez sélectionner une catégorie.";
    }

    if (details.length > 10000) {
      return "Les détails du projet sont trop longs.";
    }

    if (
      imageUrl &&
      !isValidImageReference(imageUrl)
    ) {
      return "Le chemin ou l'URL de l'image est invalide.";
    }

    if (
      form.project_url.trim() &&
      !isValidUrl(
        form.project_url.trim(),
      )
    ) {
      return "L'URL du projet est invalide.";
    }

    if (
      form.demo_url.trim() &&
      !isValidUrl(
        form.demo_url.trim(),
      )
    ) {
      return "L'URL de démonstration est invalide.";
    }

    return null;
  }

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (uploading) {
      setError(
        "Veuillez attendre la fin du téléchargement de l'image.",
      );

      return;
    }

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const status =
        form.published
          ? form.status
          : "maintenance";

      const imageUrl =
        form.image_url.trim();

      const payload: ProjectPayload = {
        title: form.title.trim(),

        short_title:
          form.short_title.trim() ||
          null,

        description:
          form.description.trim(),

        details:
          form.details.trim() ||
          null,

        category:
          normalizeCategory(
            form.category,
          ),

        image_url:
          imageUrl || null,

        project_url:
          form.project_url.trim() ||
          null,

        demo_url:
          form.demo_url.trim() ||
          null,

        technologies:
          normalizeArray(
            form.technologies,
          ),

        benefits:
          normalizeArray(
            form.benefits,
          ),

        featured:
          Boolean(form.featured),

        published:
          Boolean(form.published),

        status,
      };

      console.log(
        "[ProjectForm] Payload envoyé:",
        payload,
      );

      if (isEditMode && id) {
        await updateProject(
          id,
          payload,
        );

        setSuccess(
          "Projet modifié avec succès.",
        );
      } else {
        await createProject(
          payload,
        );

        setSuccess(
          "Projet créé avec succès.",
        );

        setForm({
          ...EMPTY_FORM,
        });

        setImagePreview("");
        setTechnologyInput("");
        setBenefitInput("");
      }

      window.setTimeout(() => {
        navigate(
          "/admin/projects",
        );
      }, 700);
    } catch (err) {
      console.error(
        "Erreur sauvegarde projet:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'enregistrer le projet.",
      );
    } finally {
      setSaving(false);
    }
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <Container>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-dw-border border-t-dw-primary" />

            <p className="mt-4 text-sm text-dw-muted">
              Chargement du projet...
            </p>
          </div>
        </div>
      </Container>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Container>
      <div className="py-8 sm:py-10">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/projects",
                )
              }
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-dw-muted transition hover:text-dw-text"
            >
              <ArrowLeft size={16} />
              Retour aux projets
            </button>

            <h1 className="text-3xl font-bold tracking-tight text-dw-text">
              {isEditMode
                ? "Modifier le projet"
                : "Nouveau projet"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-dw-muted">
              {isEditMode
                ? "Modifiez les informations de cette réalisation."
                : "Ajoutez une nouvelle réalisation à votre portfolio."}
            </p>
          </div>

          <ThemeSwitcher />
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
            <X
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-600">
            <Check
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{success}</p>
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* =================================================
              INFORMATIONS PRINCIPALES
          ================================================= */}

          <section className="rounded-3xl border border-dw-border bg-dw-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-dw-text">
                Informations principales
              </h2>

              <p className="mt-1 text-sm text-dw-muted">
                Les informations affichées sur la page Réalisations.
              </p>
            </div>

            <div className="grid gap-6">

              {/* TITLE */}

              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-dw-text"
                >
                  Titre
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="title"
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    updateField(
                      "title",
                      event.target.value,
                    )
                  }
                  placeholder="Ex. Site web hôtelier"
                  className="w-full rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none transition placeholder:text-dw-muted/60 focus:border-dw-primary/50 focus:ring-2 focus:ring-dw-primary/10"
                />
              </div>

              {/* SHORT TITLE */}

              <div>
                <label
                  htmlFor="short_title"
                  className="mb-2 block text-sm font-semibold text-dw-text"
                >
                  Titre court
                </label>

                <input
                  id="short_title"
                  type="text"
                  value={form.short_title}
                  onChange={(event) =>
                    updateField(
                      "short_title",
                      event.target.value,
                    )
                  }
                  placeholder="Ex. Site hôtelier"
                  className="w-full rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none transition placeholder:text-dw-muted/60 focus:border-dw-primary/50 focus:ring-2 focus:ring-dw-primary/10"
                />

                <p className="mt-2 text-xs text-dw-muted">
                  Optionnel. Utilisé lorsque le titre complet est trop long.
                </p>
              </div>

              {/* CATEGORY */}

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-dw-text"
                >
                  Catégorie
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <select
                  id="category"
                  value={
                    showCustomCategory
                      ? "__custom__"
                      : form.category
                  }
                  onChange={(event) =>
                    handleCategoryChange(
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none transition focus:border-dw-primary/50 focus:ring-2 focus:ring-dw-primary/10"
                >
                  <option value="">
                    Sélectionner une catégorie
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={`category-${category}`}
                        value={category}
                      >
                        {category}
                      </option>
                    ),
                  )}

                  <option value="__custom__">
                    + Ajouter une nouvelle catégorie
                  </option>
                </select>

                {showCustomCategory && (
                  <div className="mt-3 rounded-2xl border border-dw-primary/20 bg-dw-primary/5 p-4">
                    <label
                      htmlFor="custom-category"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wide text-dw-primary"
                    >
                      Nouvelle catégorie
                    </label>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        id="custom-category"
                        type="text"
                        value={customCategory}
                        onChange={(event) =>
                          setCustomCategory(
                            event.target.value,
                          )
                        }
                        onKeyDown={(event) => {
                          if (
                            event.key ===
                            "Enter"
                          ) {
                            event.preventDefault();
                            addCustomCategory();
                          }
                        }}
                        placeholder="Ex. Data & IA"
                        className="min-w-0 flex-1 rounded-xl border border-dw-border bg-dw-surface px-4 py-2.5 text-sm text-dw-text outline-none focus:border-dw-primary/50"
                        autoFocus
                      />

                      <button
                        type="button"
                        onClick={
                          addCustomCategory
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-dw-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        <Plus size={16} />
                        Ajouter
                      </button>

                      <button
                        type="button"
                        onClick={
                          cancelCustomCategory
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-dw-border bg-dw-surface px-4 py-2.5 text-sm font-medium text-dw-muted transition hover:text-dw-text"
                      >
                        <X size={16} />
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-dw-text"
                >
                  Description
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                </label>

                <textarea
                  id="description"
                  rows={6}
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value,
                    )
                  }
                  placeholder="Décrivez le projet, son objectif et la solution développée..."
                  className="w-full resize-y rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm leading-6 text-dw-text outline-none transition placeholder:text-dw-muted/60 focus:border-dw-primary/50 focus:ring-2 focus:ring-dw-primary/10"
                />
              </div>

              {/* DETAILS */}

              <div>
                <label
                  htmlFor="details"
                  className="mb-2 block text-sm font-semibold text-dw-text"
                >
                  Détails du projet
                </label>

                <textarea
                  id="details"
                  rows={5}
                  value={form.details}
                  onChange={(event) =>
                    updateField(
                      "details",
                      event.target.value,
                    )
                  }
                  placeholder="Informations complémentaires sur le projet..."
                  className="w-full resize-y rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm leading-6 text-dw-text outline-none transition placeholder:text-dw-muted/60 focus:border-dw-primary/50 focus:ring-2 focus:ring-dw-primary/10"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              IMAGE
          ================================================= */}

          <section className="rounded-3xl border border-dw-border bg-dw-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-dw-text">
                Image du projet
              </h2>

              <p className="mt-1 text-sm text-dw-muted">
                Image principale affichée sur la carte de réalisation.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

              {/* PREVIEW */}

              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-dw-border bg-dw-surface">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt={
                        form.title ||
                        "Aperçu du projet"
                      }
                      className="h-full w-full object-cover"
                      onError={() => {
                        setImagePreview("");
                      }}
                    />

                    <button
                      type="button"
                      onClick={
                        removeImage
                      }
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-red-500"
                      aria-label="Supprimer l'image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <ImageIcon
                      size={40}
                      className="text-dw-muted/50"
                    />

                    <p className="mt-3 text-sm font-medium text-dw-muted">
                      Aucune image
                    </p>
                  </div>
                )}
              </div>

              {/* UPLOAD */}

              <div className="flex flex-col justify-center">
                <label
                  htmlFor="project-image"
                  className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dw-border bg-dw-surface px-5 py-3 text-sm font-semibold text-dw-text transition hover:border-dw-primary/30 hover:text-dw-primary ${
                    uploading
                      ? "pointer-events-none opacity-60"
                      : ""
                  }`}
                >
                  {uploading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-dw-border border-t-dw-primary" />
                      Téléchargement...
                    </>
                  ) : (
                    <>
                      <Upload size={17} />
                      Choisir une image
                    </>
                  )}
                </label>

                <input
                  id="project-image"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={
                    handleImageChange
                  }
                  disabled={uploading}
                  className="hidden"
                />

                <p className="mt-3 text-xs leading-5 text-dw-muted">
                  PNG, JPG, WEBP ou GIF.
                  <br />
                  Taille maximale : 5 Mo.
                </p>

                {/* IMAGE URL */}

                <div className="mt-5">
                  <label
                    htmlFor="image_url"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wide text-dw-muted"
                  >
                    Chemin ou URL de l'image
                  </label>

                  <input
                    id="image_url"
                    type="text"
                    value={
                      form.image_url
                    }
                    onChange={(event) => {
                      const value =
                        event.target.value;

                      updateField(
                        "image_url",
                        value,
                      );

                      setImagePreview(
                        getProjectImageUrl(
                          value,
                        ),
                      );
                    }}
                    placeholder="/uploads/projects/image.jpg ou https://..."
                    className="w-full rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none focus:border-dw-primary/50"
                  />

                  <p className="mt-2 text-xs text-dw-muted">
                    L'upload automatique renseigne ce champ. Vous n'avez normalement pas besoin de le modifier.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              URLS
          ================================================= */}

          <section className="rounded-3xl border border-dw-border bg-dw-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-dw-text">
                Liens du projet
              </h2>

              <p className="mt-1 text-sm text-dw-muted">
                Les deux liens sont optionnels.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label
                  htmlFor="project_url"
                  className="mb-2 block text-sm font-semibold text-dw-text"
                >
                  URL du projet
                </label>

                <input
                  id="project_url"
                  type="url"
                  value={
                    form.project_url
                  }
                  onChange={(event) =>
                    updateField(
                      "project_url",
                      event.target.value,
                    )
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none focus:border-dw-primary/50"
                />
              </div>

              <div>
                <label
                  htmlFor="demo_url"
                  className="mb-2 block text-sm font-semibold text-dw-text"
                >
                  URL de démonstration
                </label>

                <input
                  id="demo_url"
                  type="url"
                  value={
                    form.demo_url
                  }
                  onChange={(event) =>
                    updateField(
                      "demo_url",
                      event.target.value,
                    )
                  }
                  placeholder="https://..."
                  className="w-full rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none focus:border-dw-primary/50"
                />
              </div>
            </div>
          </section>

          {/* =================================================
              TECHNOLOGIES
          ================================================= */}

          <section className="rounded-3xl border border-dw-border bg-dw-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-dw-text">
                Technologies
              </h2>

              <p className="mt-1 text-sm text-dw-muted">
                Ajoutez les technologies utilisées.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={
                  technologyInput
                }
                onChange={(event) =>
                  setTechnologyInput(
                    event.target.value,
                  )
                }
                onKeyDown={
                  handleTechnologyKeyDown
                }
                placeholder="Ex. React, Node.js, PostgreSQL..."
                className="min-w-0 flex-1 rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none focus:border-dw-primary/50"
              />

              <button
                type="button"
                onClick={
                  addTechnology
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-dw-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Plus size={17} />
                Ajouter
              </button>
            </div>

            {form.technologies.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {form.technologies.map(
                  (
                    technology,
                    index,
                  ) => (
                    <span
                      key={`technology-${technology}-${index}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-dw-border bg-dw-surface px-3 py-2 text-xs font-medium text-dw-text"
                    >
                      {technology}

                      <button
                        type="button"
                        onClick={() =>
                          removeTechnology(
                            index,
                          )
                        }
                        className="text-dw-muted transition hover:text-red-500"
                        aria-label={`Supprimer ${technology}`}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ),
                )}
              </div>
            )}
          </section>

          {/* =================================================
              BENEFITS
          ================================================= */}

          <section className="rounded-3xl border border-dw-border bg-dw-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-dw-text">
                Points clés
              </h2>

              <p className="mt-1 text-sm text-dw-muted">
                Les avantages affichés dans la carte du projet.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={
                  benefitInput
                }
                onChange={(event) =>
                  setBenefitInput(
                    event.target.value,
                  )
                }
                onKeyDown={
                  handleBenefitKeyDown
                }
                placeholder="Ex. Interface responsive"
                className="min-w-0 flex-1 rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none focus:border-dw-primary/50"
              />

              <button
                type="button"
                onClick={
                  addBenefit
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-dw-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <Plus size={17} />
                Ajouter
              </button>
            </div>

            {form.benefits.length > 0 && (
              <div className="mt-5 space-y-2">
                {form.benefits.map(
                  (
                    benefit,
                    index,
                  ) => (
                    <div
                      key={`benefit-${benefit}-${index}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-dw-border bg-dw-surface px-4 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-dw-primary/10 text-dw-primary">
                          <Check size={14} />
                        </div>

                        <span className="text-sm text-dw-text">
                          {benefit}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeBenefit(
                            index,
                          )
                        }
                        className="shrink-0 text-dw-muted transition hover:text-red-500"
                        aria-label={`Supprimer ${benefit}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ),
                )}
              </div>
            )}
          </section>

          {/* =================================================
              PUBLICATION
          ================================================= */}

          <section className="rounded-3xl border border-dw-border bg-dw-card p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-dw-text">
                Publication
              </h2>

              <p className="mt-1 text-sm text-dw-muted">
                Contrôlez la visibilité et l'état du projet.
              </p>
            </div>

            <div className="space-y-4">

              {/* PUBLISHED */}

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-dw-border bg-dw-surface p-4">
                <input
                  type="checkbox"
                  checked={
                    form.published
                  }
                  onChange={(event) =>
                    updateField(
                      "published",
                      event.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4 rounded border-dw-border text-dw-primary focus:ring-dw-primary"
                />

                <span>
                  <span className="block text-sm font-semibold text-dw-text">
                    Publier le projet
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-dw-muted">
                    Le projet sera visible sur la page Réalisations.
                  </span>
                </span>
              </label>

              {/* FEATURED */}

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-dw-border bg-dw-surface p-4">
                <input
                  type="checkbox"
                  checked={
                    form.featured
                  }
                  onChange={(event) =>
                    updateField(
                      "featured",
                      event.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4 rounded border-dw-border text-dw-primary focus:ring-dw-primary"
                />

                <span>
                  <span className="block text-sm font-semibold text-dw-text">
                    Mettre en avant
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-dw-muted">
                    Marque ce projet comme réalisation importante.
                  </span>
                </span>
              </label>

              {/* STATUS */}

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-semibold text-dw-text"
                >
                  État du projet
                </label>

                <select
                  id="status"
                  value={
                    form.status
                  }
                  onChange={(event) =>
                    updateField(
                      "status",
                      event.target.value as FormState["status"],
                    )
                  }
                  disabled={
                    !form.published
                  }
                  className="w-full rounded-xl border border-dw-border bg-dw-surface px-4 py-3 text-sm text-dw-text outline-none transition focus:border-dw-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="completed">
                    Terminé
                  </option>

                  <option value="in-progress">
                    En cours
                  </option>

                  <option value="maintenance">
                    Maintenance
                  </option>
                </select>

                {!form.published && (
                  <p className="mt-2 text-xs text-dw-muted">
                    Un projet non publié est envoyé avec le statut « maintenance ».
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="sticky bottom-4 z-20 flex flex-col-reverse gap-3 rounded-2xl border border-dw-border bg-dw-card/95 p-3 shadow-xl backdrop-blur-md sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/projects",
                )
              }
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-dw-border bg-dw-surface px-5 py-3 text-sm font-semibold text-dw-muted transition hover:text-dw-text disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                uploading
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-dw-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save size={17} />

                  {isEditMode
                    ? "Enregistrer les modifications"
                    : "Créer le projet"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}