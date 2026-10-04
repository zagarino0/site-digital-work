/**
 * =========================================================
 * CATÉGORIES DES PROJETS DIGITAL WORK
 * =========================================================
 *
 * Source unique utilisée par :
 * - ProjectForm.tsx
 * - Realisations.tsx
 * - autres interfaces administratives
 *
 * IMPORTANT :
 * Ne pas recréer les catégories directement dans les composants.
 */

export const PROJECT_CATEGORIES = [
  "Développement Web",
  "Application Mobile",
  "Logiciel",
  "Réseau & Infrastructure",
  "Cybersécurité",
  "IoT & Systèmes connectés",
  "UI/UX Design",
  "E-commerce",
  "CMS & WordPress",
  "ERP & Gestion",
  "Automatisation",
  "Maintenance informatique",
  "Cloud & Hébergement",
  "API & Backend",
  "Autre",
] as const;

/**
 * Type TypeScript d'une catégorie.
 */
export type ProjectCategory =
  (typeof PROJECT_CATEGORIES)[number];

/**
 * Normalisation d'une catégorie.
 *
 * Permet d'éviter les doublons causés par :
 *
 * "Développement Web"
 * "Développement Web "
 * " développement web"
 * "DEVELOPPEMENT WEB"
 */
export function normalizeProjectCategory(
  category: string | null | undefined
): string {
  if (!category) {
    return "";
  }

  return category
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Recherche la catégorie officielle correspondant
 * à une valeur provenant de la base de données.
 *
 * Exemple :
 *
 * " développement web "
 *       ↓
 * "Développement Web"
 */
export function getCanonicalProjectCategory(
  category: string | null | undefined
): string {
  const normalized = normalizeProjectCategory(category);

  if (!normalized) {
    return "";
  }

  const found = PROJECT_CATEGORIES.find(
    (item) =>
      normalizeProjectCategory(item).toLocaleLowerCase("fr-FR") ===
      normalized.toLocaleLowerCase("fr-FR")
  );

  return found ?? normalized;
}

/**
 * Retourne les catégories uniques utilisées par les projets.
 *
 * Les catégories sont comparées sans tenir compte :
 * - des espaces
 * - des majuscules/minuscules
 * - de la forme Unicode
 *
 * La valeur retournée utilise toujours le libellé officiel
 * lorsque celui-ci existe dans PROJECT_CATEGORIES.
 */
export function getUniqueProjectCategories(
  categories: Array<string | null | undefined>
): string[] {
  const result: string[] = [];
  const seen = new Set<string>();

  for (const category of categories) {
    const canonical = getCanonicalProjectCategory(category);

    if (!canonical) {
      continue;
    }

    const key = normalizeProjectCategory(canonical)
      .toLocaleLowerCase("fr-FR");

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(canonical);
  }

  /**
   * On conserve l'ordre défini dans PROJECT_CATEGORIES.
   *
   * Cela garantit que Realisations.tsx et ProjectForm.tsx
   * présentent les catégories dans le même ordre.
   */
  return result.sort((a, b) => {
    const indexA = PROJECT_CATEGORIES.findIndex(
      (category) =>
        normalizeProjectCategory(category).toLocaleLowerCase("fr-FR") ===
        normalizeProjectCategory(a).toLocaleLowerCase("fr-FR")
    );

    const indexB = PROJECT_CATEGORIES.findIndex(
      (category) =>
        normalizeProjectCategory(category).toLocaleLowerCase("fr-FR") ===
        normalizeProjectCategory(b).toLocaleLowerCase("fr-FR")
    );

    /**
     * Les catégories personnalisées/non prévues
     * dans la liste officielle vont à la fin.
     */
    if (indexA === -1 && indexB === -1) {
      return a.localeCompare(b, "fr");
    }

    if (indexA === -1) {
      return 1;
    }

    if (indexB === -1) {
      return -1;
    }

    return indexA - indexB;
  });
}


/**
 * Clé i18n associée à chaque catégorie officielle.
 * Cette table évite de dériver les clés à partir du texte français,
 * ce qui cassait la traduction dès qu'une catégorie n'avait pas
 * exactement le même libellé que les traductions.
 */
export const PROJECT_CATEGORY_TRANSLATION_KEYS: Record<string, string> = {
  "Développement Web": "developpement_web",
  "Application Mobile": "application_mobile",
  "Logiciel": "logiciel",
  "Réseau & Infrastructure": "reseaux_infrastructure",
  "Cybersécurité": "cybersecurite",
  "IoT & Systèmes connectés": "iot_systemes_connectes",
  "UI/UX Design": "ui_ux_design",
  "E-commerce": "ecommerce",
  "CMS & WordPress": "cms_wordpress",
  "ERP & Gestion": "erp_gestion",
  "Automatisation": "automatisation",
  "Maintenance informatique": "maintenance_informatique",
  "Cloud & Hébergement": "cloud_hebergement",
  "API & Backend": "api_backend",
  "Autre": "autre",
};

export function getProjectCategoryTranslationKey(category: string | null | undefined): string {
  const canonical = getCanonicalProjectCategory(category);
  return PROJECT_CATEGORY_TRANSLATION_KEYS[canonical] ?? "autre";
}

/**
 * Retourne toutes les catégories officielles.
 *
 * Utile pour ProjectForm.tsx.
 */
export function getProjectCategories(): string[] {
  return [...PROJECT_CATEGORIES];
}