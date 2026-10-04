-- Digital Work: secure admin password reset
-- Run this migration once in the Neon SQL editor.

ALTER TABLE admin_users
  ADD COLUMN IF NOT EXISTS email VARCHAR(255);

CREATE UNIQUE INDEX IF NOT EXISTS
  admin_users_email_unique_idx
ON admin_users (LOWER(email))
WHERE email IS NOT NULL;

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token_hash CHAR(64) NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS
  password_reset_tokens_admin_id_idx
ON password_reset_tokens (admin_id);

CREATE INDEX IF NOT EXISTS
  password_reset_tokens_expires_at_idx
ON password_reset_tokens (expires_at);
