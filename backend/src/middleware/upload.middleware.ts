import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

/* =========================================================
   PATHS
========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * upload.middleware.ts
 *
 * backend/
 * ├── src/
 * │   └── middleware/
 * │       └── upload.middleware.ts
 * │
 * └── uploads/
 *     └── projects/
 *
 * Depuis src/middleware :
 * ../../uploads
 */

const uploadRoot = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.resolve(__dirname, "../../uploads");

const uploadDirectory = path.join(
  uploadRoot,
  "projects"
);

/* =========================================================
   CREATE DIRECTORY
========================================================= */

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

console.log(
  "[UPLOAD] Project upload directory:",
  uploadDirectory
);

/* =========================================================
   ALLOWED MIME TYPES
========================================================= */

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/* =========================================================
   STORAGE
========================================================= */

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (_req, file, callback) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const baseName = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const uniqueName = `${Date.now()}-${
      baseName || "project"
    }${extension}`;

    callback(null, uniqueName);
  },
});

/* =========================================================
   MULTER
========================================================= */

export const uploadProjectImage = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(
        new Error(
          "Format d'image non autorisé. Utilisez JPG, PNG, WEBP ou GIF."
        )
      );

      return;
    }

    callback(null, true);
  },
});