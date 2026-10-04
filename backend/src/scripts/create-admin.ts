import "dotenv/config";

import bcrypt from "bcryptjs";

import pool from "../database/db.js";

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const email = process.env.ADMIN_EMAIL;

if (!username || !password || !email) {
  throw new Error(
    "ADMIN_USERNAME, ADMIN_PASSWORD et ADMIN_EMAIL sont requis."
  );
}

const passwordHash =
  await bcrypt.hash(password, 12);

await pool.query(
  `
    INSERT INTO admin_users (
      username,
      email,
      password_hash
    )
    VALUES ($1, $2, $3)
    ON CONFLICT (username)
    DO UPDATE SET
      email = EXCLUDED.email,
      password_hash = EXCLUDED.password_hash,
      is_active = TRUE,
      updated_at = NOW()
  `,
  [
    username,
    email.toLowerCase().trim(),
    passwordHash,
  ]
);

console.log(
  `Administrateur "${username}" créé/mis à jour.`
);

await pool.end();
