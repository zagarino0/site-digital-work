import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* =========================================================
   UPLOAD STORAGE
========================================================= */

/*
 * Render Free n'a pas de Persistent Disk.
 *
 * Si UPLOADS_DIR pointe vers un chemin non accessible (par exemple
 * /var/data/uploads sans disque monté), on utilise automatiquement
 * un dossier local writable du service.
 *
 * Quand un Persistent Disk Render sera configuré plus tard avec :
 *
 *   UPLOADS_DIR=/var/data/uploads
 *
 * ce chemin sera utilisé automatiquement, sans modification du code.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configuredUploadRoot = process.env.UPLOADS_DIR?.trim();

const localUploadRoot = path.resolve(__dirname, "../../uploads");

function ensureWritableDirectory(directory: string): boolean {
  try {
    fs.mkdirSync(directory, { recursive: true });

    // Vérifie réellement que le processus peut écrire dans le dossier.
    fs.accessSync(directory, fs.constants.W_OK);

    return true;
  } catch (error) {
    console.warn(
      `[UPLOAD] Storage path unavailable: ${directory}`,
      error instanceof Error ? error.message : error
    );

    return false;
  }
}

export function getUploadsRoot(): string {
  if (
    configuredUploadRoot &&
    ensureWritableDirectory(configuredUploadRoot)
  ) {
    console.log(
      "[UPLOAD] Using configured storage:",
      configuredUploadRoot
    );

    return configuredUploadRoot;
  }

  if (!configuredUploadRoot) {
    ensureWritableDirectory(localUploadRoot);
  } else {
    console.warn(
      "[UPLOAD] Falling back to local temporary storage because UPLOADS_DIR is not writable."
    );

    ensureWritableDirectory(localUploadRoot);
  }

  console.log(
    "[UPLOAD] Using local storage:",
    localUploadRoot
  );

  return localUploadRoot;
}

export function getProjectUploadsDirectory(): string {
  const directory = path.join(
    getUploadsRoot(),
    "projects"
  );

  ensureWritableDirectory(directory);

  return directory;
}

export function getUploadStorageWarning(): string | null {
  if (!configuredUploadRoot) {
    return "UPLOADS_DIR is not configured; using local temporary storage.";
  }

  if (!ensureWritableDirectory(configuredUploadRoot)) {
    return `UPLOADS_DIR is not writable: ${configuredUploadRoot}. Using local temporary storage.`;
  }

  return null;
}
