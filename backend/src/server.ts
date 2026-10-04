import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import pool from "./database/db.js";

import authRoutes from "./routes/auth.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

/* =========================================================
   PATHS
========================================================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * server.ts
 *
 * backend/src/server.ts
 *
 * backend/
 * ├── src/
 * │   └── server.ts
 * │
 * └── uploads/
 *
 * Depuis src :
 * ../uploads
 */

const uploadsPath = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.resolve(__dirname, "../uploads");

console.log(
  "[UPLOAD] Static uploads directory:",
  uploadsPath
);

/* =========================================================
   APP
========================================================= */

const app = express();

const PORT = Number(
  process.env.PORT ?? 4000
);

/* =========================================================
   CORS
========================================================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://zagarino0.github.io",
  process.env.FRONTEND_URL,
].filter(
  (origin): origin is string =>
    Boolean(origin)
);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

/* =========================================================
   BODY PARSER
========================================================= */

app.use(express.json());

/* =========================================================
   STATIC UPLOADS
========================================================= */

/*
 * Les fichiers présents dans :
 *
 * backend/uploads/...
 *
 * sont accessibles avec :
 *
 * http://localhost:4000/uploads/...
 */

app.use(
  "/uploads",
  express.static(uploadsPath)
);

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
  "/api/health",
  async (_req, res) => {
    try {
      const result = await pool.query(
        "SELECT NOW() AS database_time"
      );

      res.status(200).json({
        success: true,
        message:
          "Digital Work API opérationnelle",
        database: "connected",
        databaseTime:
          result.rows[0]?.database_time,
      });
    } catch (error) {
      console.error(
        "Health check error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Impossible de se connecter à PostgreSQL",
      });
    }
  }
);

/* =========================================================
   AUTHENTIFICATION
========================================================= */

app.use(
  "/api/auth",
  authRoutes
);

/* =========================================================
   PROJETS
========================================================= */

app.use(
  "/api/projects",
  projectsRoutes
);

/* =========================================================
   UPLOADS API
========================================================= */

app.use(
  "/api/uploads",
  uploadRoutes
);

/* =========================================================
   404 API
========================================================= */

app.use(
  (_req, res) => {
    res.status(404).json({
      success: false,
      message:
        "Route API introuvable.",
    });
  }
);

/* =========================================================
   START SERVER
========================================================= */

app.listen(
  PORT,
  () => {
    console.log(
      `Digital Work API démarrée sur http://localhost:${PORT}`
    );

    console.log(
      `Images disponibles sur http://localhost:${PORT}/uploads`
    );
  }
);