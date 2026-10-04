import pool from "../database/db.js";

/* =========================================================
   TYPES
========================================================= */

export interface CreateProjectData {
  title: string;
  short_title?: string | null | undefined;
  description: string;
  details?: string | null | undefined;
  category: string;
  image_url?: string | null | undefined;
  technologies?: string[] | undefined;
  benefits?: string[] | undefined;
  project_url?: string | null | undefined;
  demo_url?: string | null | undefined;
  featured?: boolean | undefined;
  published?: boolean | undefined;
  status?:
    | "completed"
    | "in-progress"
    | "maintenance"
    | undefined;
}

export interface UpdateProjectData {
  title?: string | undefined;
  short_title?: string | null | undefined;
  description?: string | undefined;
  details?: string | null | undefined;
  category?: string | undefined;
  image_url?: string | null | undefined;
  technologies?: string[] | undefined;
  benefits?: string[] | undefined;
  project_url?: string | null | undefined;
  demo_url?: string | null | undefined;
  featured?: boolean | undefined;
  published?: boolean | undefined;
  status?:
    | "completed"
    | "in-progress"
    | "maintenance"
    | undefined;
}

/* =========================================================
   GET ALL PROJECTS
========================================================= */

export async function getProjects() {
  const result = await pool.query(`
    SELECT
      id,
      title,
      short_title,
      description,
      details,
      category,
      image_url,
      technologies,
      benefits,
      project_url,
      demo_url,
      featured,
      published,
      status,
      created_at,
      updated_at
    FROM public.projects
    ORDER BY created_at ASC
  `);

  return result.rows;
}

/* =========================================================
   GET PUBLISHED PROJECTS — PUBLIC SOURCE
========================================================= */

export async function getPublishedProjects() {
  const result = await pool.query(`
    SELECT
      id,
      title,
      short_title,
      description,
      details,
      category,
      image_url,
      technologies,
      benefits,
      project_url,
      demo_url,
      featured,
      published,
      status,
      created_at,
      updated_at
    FROM public.projects
    WHERE published = TRUE
    ORDER BY created_at ASC
  `);

  return result.rows;
}

/* =========================================================
   GET PROJECT BY ID
========================================================= */



export async function getProjectById(id: string) {
  const result = await pool.query(
    `
      SELECT
        id,
        title,
        short_title,
        description,
        details,
        category,
        image_url,
        technologies,
        benefits,
        project_url,
        demo_url,
        featured,
        published,
        status,
        created_at,
        updated_at
      FROM public.projects
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] ?? null;
}

/* =========================================================
   CREATE PROJECT
========================================================= */

export async function createProject(
  data: CreateProjectData
) {
  const result = await pool.query(
    `
      INSERT INTO public.projects (
        title,
        short_title,
        description,
        details,
        category,
        image_url,
        technologies,
        benefits,
        project_url,
        demo_url,
        featured,
        published,
        status
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7::jsonb,
        $8::jsonb,
        $9,
        $10,
        $11,
        $12,
        $13
      )
      RETURNING *
    `,
    [
      data.title,
      data.short_title ?? null,
      data.description,
      data.details ?? null,
      data.category,
      data.image_url ?? null,
      JSON.stringify(data.technologies ?? []),
      JSON.stringify(data.benefits ?? []),
      data.project_url ?? null,
      data.demo_url ?? null,
      data.featured ?? false,
      data.published ?? true,
      data.status ?? "completed",
    ]
  );

  return result.rows[0];
}

/* =========================================================
   UPDATE PROJECT
========================================================= */

export async function updateProject(
  id: string,
  data: UpdateProjectData
) {
  const fields: string[] = [];
  const values: unknown[] = [];

  const addField = (
    column: string,
    value: unknown
  ) => {
    fields.push(
      `${column} = $${values.length + 1}`
    );

    values.push(value);
  };

  /* =======================================================
     TEXT FIELDS
  ======================================================= */

  if (data.title !== undefined) {
    addField("title", data.title);
  }

  if (data.short_title !== undefined) {
    addField(
      "short_title",
      data.short_title
    );
  }

  if (data.description !== undefined) {
    addField(
      "description",
      data.description
    );
  }

  if (data.details !== undefined) {
    addField(
      "details",
      data.details
    );
  }

  if (data.category !== undefined) {
    addField(
      "category",
      data.category
    );
  }

  if (data.image_url !== undefined) {
    addField(
      "image_url",
      data.image_url
    );
  }

  /* =======================================================
     JSONB
  ======================================================= */

  if (data.technologies !== undefined) {
    fields.push(
      `technologies = $${values.length + 1}::jsonb`
    );

    values.push(
      JSON.stringify(data.technologies)
    );
  }

  if (data.benefits !== undefined) {
    fields.push(
      `benefits = $${values.length + 1}::jsonb`
    );

    values.push(
      JSON.stringify(data.benefits)
    );
  }

  /* =======================================================
     URLS
  ======================================================= */

  if (data.project_url !== undefined) {
    addField(
      "project_url",
      data.project_url
    );
  }

  if (data.demo_url !== undefined) {
    addField(
      "demo_url",
      data.demo_url
    );
  }

  /* =======================================================
     BOOLEAN
  ======================================================= */

  if (data.featured !== undefined) {
    addField(
      "featured",
      data.featured
    );
  }

  if (data.published !== undefined) {
    addField(
      "published",
      data.published
    );
  }

  /* =======================================================
     STATUS
  ======================================================= */

  if (data.status !== undefined) {
    addField(
      "status",
      data.status
    );
  }

  /* =======================================================
     NOTHING TO UPDATE
  ======================================================= */

  if (fields.length === 0) {
    return getProjectById(id);
  }

  fields.push("updated_at = NOW()");

  values.push(id);

  const result = await pool.query(
    `
      UPDATE public.projects
      SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING *
    `,
    values
  );

  if (!result.rows[0]) {
    return null;
  }

  return getProjectById(id);
}

/* =========================================================
   DELETE PROJECT
========================================================= */

export async function deleteProject(
  id: string
) {
  const result = await pool.query(
    `
      DELETE FROM public.projects
      WHERE id = $1
      RETURNING id
    `,
    [id]
  );

  if (!result.rows[0]) {
    return null;
  }

  return result.rows[0];
}