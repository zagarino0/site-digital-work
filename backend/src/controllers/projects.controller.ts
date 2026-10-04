import type { Request, Response } from "express";
import { z } from "zod";

import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  getPublishedProjects,
  updateProject,
} from "../services/projects.service.js";

/* =========================================================
   VALIDATION
========================================================= */

const projectSchema = z.object({
  title: z.string().min(1).max(150),

  short_title: z
    .string()
    .max(100)
    .nullable()
    .optional(),

  description: z.string().min(1),

  details: z
    .string()
    .nullable()
    .optional(),

  category: z
    .string()
    .min(1)
    .max(100),

  image_url: z
    .string()
    .nullable()
    .optional(),

  technologies: z
    .array(z.string())
    .default([]),

  benefits: z
    .array(z.string())
    .default([]),

  project_url: z
    .string()
    .nullable()
    .optional(),

  demo_url: z
    .string()
    .nullable()
    .optional(),

  featured: z
    .boolean()
    .default(false),

  published: z
    .boolean()
    .default(true),

  status: z
    .enum([
      "completed",
      "in-progress",
      "maintenance",
    ])
    .default("completed"),
});

const updateProjectSchema =
  projectSchema.partial();

/* =========================================================
   PARAMETER ID
========================================================= */

function getProjectId(
  req: Request,
  res: Response
): string | null {
  const { id } = req.params;

  if (
    typeof id !== "string" ||
    id.length === 0
  ) {
    res.status(400).json({
      success: false,
      message:
        "Identifiant du projet invalide.",
    });

    return null;
  }

  return id;
}

/* =========================================================
   GET ALL PROJECTS
========================================================= */

export async function listProjects(
  _req: Request,
  res: Response
) {
  try {
    const projects = await getPublishedProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(
      "listProjects:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Impossible de récupérer les projets publiés.",
    });
  }
}

export async function listAdminProjects(
  _req: Request,
  res: Response
) {
  try {
    const projects = await getProjects();

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error(
      "listAdminProjects:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Impossible de récupérer les projets d'administration.",
    });
  }
}

/* =========================================================
   GET PROJECT BY ID
========================================================= */

export async function showProject(
  req: Request,
  res: Response
) {
  const id = getProjectId(req, res);

  if (!id) {
    return;
  }

  try {
    const project =
      await getProjectById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Projet introuvable.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error(
      "showProject:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Impossible de récupérer le projet.",
    });
  }
}

/* =========================================================
   CREATE PROJECT
========================================================= */

export async function createProjectController(
  req: Request,
  res: Response
) {
  try {
    const data =
      projectSchema.parse(req.body);

    const project =
      await createProject(data);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "Validation projet échouée:",
        JSON.stringify(
          error.flatten(),
          null,
          2
        )
      );

      console.error(
        "Payload reçu:",
        JSON.stringify(
          req.body,
          null,
          2
        )
      );

      res.status(400).json({
        success: false,
        message: "Données invalides.",
        errors: error.flatten(),
      });

      return;
    }

    console.error(
      "createProjectController:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Impossible de créer le projet.",
    });
  }
}

/* =========================================================
   UPDATE PROJECT
========================================================= */

export async function updateProjectController(
  req: Request,
  res: Response
) {
  const id = getProjectId(req, res);

  if (!id) {
    return;
  }

  try {
    const data =
      updateProjectSchema.parse(req.body);

    const project =
      await updateProject(
        id,
        data
      );

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Projet introuvable.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        "Validation projet échouée:",
        JSON.stringify(
          error.flatten(),
          null,
          2
        )
      );

      console.error(
        "Payload reçu:",
        JSON.stringify(
          req.body,
          null,
          2
        )
      );

      res.status(400).json({
        success: false,
        message: "Données invalides.",
        errors: error.flatten(),
      });

      return;
    }

    console.error(
      "updateProjectController:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Impossible de modifier le projet.",
    });
  }
}

/* =========================================================
   DELETE PROJECT
========================================================= */

export async function deleteProjectController(
  req: Request,
  res: Response
) {
  const id = getProjectId(req, res);

  if (!id) {
    return;
  }

  try {
    const project =
      await deleteProject(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Projet introuvable.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Projet supprimé.",
    });
  } catch (error) {
    console.error(
      "deleteProjectController:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Impossible de supprimer le projet.",
    });
  }
}