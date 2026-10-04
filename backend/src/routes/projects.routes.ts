import { Router } from "express";

import {
  createProjectController,
  deleteProjectController,
  listProjects,
  listAdminProjects,
  showProject,
  updateProjectController,
} from "../controllers/projects.controller.js";

import {
  requireAdmin,
} from "../middleware/auth.middleware.js";

const router = Router();

/*
  PUBLIC
*/

router.get("/", listProjects);

router.get(
  "/admin",
  requireAdmin,
  listAdminProjects
);

router.get("/:id", showProject);

/*
  ADMIN
*/

router.post(
  "/",
  requireAdmin,
  createProjectController
);

router.put(
  "/:id",
  requireAdmin,
  updateProjectController
);

router.delete(
  "/:id",
  requireAdmin,
  deleteProjectController
);

export default router;