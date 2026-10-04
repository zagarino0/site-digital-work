import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createHash, randomBytes } from "node:crypto";

import pool from "../database/db.js";

interface AdminUser {
  id: string;
  username: string;
  email: string | null;
  password_hash: string;
  is_active: boolean;
}

export interface AuthTokenPayload {
  id: string;
  username: string;
}

const PASSWORD_RESET_TTL_MINUTES = 30;

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();

  if (!secret) {
    throw new Error(
      "JWT_SECRET est obligatoire dans le fichier .env"
    );
  }

  return secret;
}

function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function findAdminByUsername(
  username: string
): Promise<AdminUser | null> {
  const normalizedUsername = username.trim();

  if (!normalizedUsername) {
    return null;
  }

  const result = await pool.query<AdminUser>(
    `
      SELECT
        id,
        username,
        email,
        password_hash,
        is_active
      FROM admin_users
      WHERE LOWER(username) = LOWER($1)
      LIMIT 1
    `,
    [normalizedUsername]
  );

  return result.rows[0] ?? null;
}

export async function findAdminByUsernameOrEmail(
  identifier: string
): Promise<AdminUser | null> {
  const normalizedIdentifier = identifier.trim();

  if (!normalizedIdentifier) {
    return null;
  }

  const result = await pool.query<AdminUser>(
    `
      SELECT
        id,
        username,
        email,
        password_hash,
        is_active
      FROM admin_users
      WHERE LOWER(username) = LOWER($1)
         OR LOWER(COALESCE(email, '')) = LOWER($1)
      LIMIT 1
    `,
    [normalizedIdentifier]
  );

  return result.rows[0] ?? null;
}

export async function verifyAdminPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  if (!password || !passwordHash) {
    return false;
  }

  try {
    return await bcrypt.compare(
      password,
      passwordHash
    );
  } catch (error) {
    console.error(
      "verifyAdminPassword:",
      error
    );

    return false;
  }
}

export function createAccessToken(
  payload: AuthTokenPayload
): string {
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
    },
    getJwtSecret(),
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN ?? "8h",
    } as jwt.SignOptions
  );
}

export async function bootstrapAdmin(
  username: string,
  email: string,
  password: string
): Promise<"created" | "already_completed"> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const bootstrapResult = await client.query<{ completed_at: Date | null }>(
      `
        SELECT completed_at
        FROM admin_bootstrap
        WHERE id = TRUE
        FOR UPDATE
      `
    );

    if (bootstrapResult.rows[0]?.completed_at) {
      await client.query("ROLLBACK");
      return "already_completed";
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await client.query(
      `
        INSERT INTO admin_users (
          username,
          email,
          password_hash,
          is_active
        )
        VALUES ($1, $2, $3, TRUE)
        ON CONFLICT (username)
        DO UPDATE SET
          email = EXCLUDED.email,
          password_hash = EXCLUDED.password_hash,
          is_active = TRUE,
          updated_at = NOW()
      `,
      [username.trim(), email.trim(), passwordHash]
    );

    await client.query(
      `
        INSERT INTO admin_bootstrap (id, completed_at)
        VALUES (TRUE, NOW())
        ON CONFLICT (id)
        DO UPDATE SET completed_at = EXCLUDED.completed_at
      `
    );

    await client.query("COMMIT");
    return "created";
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function createPasswordResetToken(
  adminId: string
): Promise<string> {
  await pool.query(
    `
      DELETE FROM password_reset_tokens
      WHERE admin_id = $1
         OR expires_at < NOW()
    `,
    [adminId]
  );

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashResetToken(rawToken);

  await pool.query(
    `
      INSERT INTO password_reset_tokens (
        admin_id,
        token_hash,
        expires_at
      )
      VALUES (
        $1,
        $2,
        NOW() + ($3 * INTERVAL '1 minute')
      )
    `,
    [
      adminId,
      tokenHash,
      PASSWORD_RESET_TTL_MINUTES,
    ]
  );

  return rawToken;
}

export async function resetAdminPassword(
  rawToken: string,
  newPassword: string
): Promise<boolean> {
  const tokenHash = hashResetToken(rawToken);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const tokenResult = await client.query<{
      id: string;
      admin_id: string;
    }>(
      `
        SELECT
          id,
          admin_id
        FROM password_reset_tokens
        WHERE token_hash = $1
          AND expires_at > NOW()
          AND used_at IS NULL
        LIMIT 1
      `,
      [tokenHash]
    );

    const token = tokenResult.rows[0];

    if (!token) {
      await client.query("ROLLBACK");
      return false;
    }

    const passwordHash = await bcrypt.hash(
      newPassword,
      12
    );

    await client.query(
      `
        UPDATE admin_users
        SET
          password_hash = $1,
          updated_at = NOW()
        WHERE id = $2
      `,
      [passwordHash, token.admin_id]
    );

    await client.query(
      `
        UPDATE password_reset_tokens
        SET used_at = NOW()
        WHERE id = $1
      `,
      [token.id]
    );

    await client.query("COMMIT");
    return true;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
