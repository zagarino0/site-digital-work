import type { Request, Response } from "express";
import { z } from "zod";

import {
  createAccessToken,
  createPasswordResetToken,
  findAdminByUsername,
  findAdminByUsernameOrEmail,
  resetAdminPassword,
  verifyAdminPassword,
} from "../services/auth.service.js";

const loginSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1),
});

const forgotPasswordSchema = z.object({
  identifier: z.string().min(1).max(255),
});

const resetPasswordSchema = z.object({
  token: z.string().min(32).max(200),
  password: z.string().min(8).max(200),
});

const RESET_REQUEST_MESSAGE =
  "Si un compte administrateur correspond à ces informations, un lien de réinitialisation a été envoyé à son adresse e-mail.";

function getFrontendUrl(): string {
  return (
    process.env.FRONTEND_URL?.trim() ||
    "https://zagarino0.github.io"
  );
}

async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    throw new Error(
      "RESEND_API_KEY et RESEND_FROM_EMAIL sont requis pour la réinitialisation du mot de passe."
    );
  }

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject:
          "Digital Work — Réinitialisation du mot de passe",
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#11110f;max-width:600px;margin:auto">
            <h2>Réinitialisation du mot de passe</h2>
            <p>Une demande de réinitialisation du mot de passe de votre espace administrateur Digital Work a été effectuée.</p>
            <p>Le lien est valable pendant 30 minutes et ne peut être utilisé qu'une seule fois.</p>
            <p>
              <a href="${resetUrl}" style="display:inline-block;padding:12px 18px;background:#11110f;color:#f0ede5;text-decoration:none;border-radius:8px">
                Réinitialiser mon mot de passe
              </a>
            </p>
            <p style="font-size:12px;color:#666">
              Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.
            </p>
          </div>
        `,
      }),
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Erreur Resend (${response.status}): ${details}`
    );
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const data = loginSchema.parse(req.body);
    const admin = await findAdminByUsername(
      data.username
    );

    if (!admin || !admin.is_active) {
      res.status(401).json({
        success: false,
        message:
          "Identifiants administrateur invalides.",
      });
      return;
    }

    const validPassword =
      await verifyAdminPassword(
        data.password,
        admin.password_hash
      );

    if (!validPassword) {
      res.status(401).json({
        success: false,
        message:
          "Identifiants administrateur invalides.",
      });
      return;
    }

    const token = createAccessToken({
      id: admin.id,
      username: admin.username,
    });

    res.status(200).json({
      success: true,
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
        },
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Données invalides.",
        errors: error.flatten(),
      });
      return;
    }

    console.error("login:", error);

    res.status(500).json({
      success: false,
      message: "Erreur lors de la connexion.",
    });
  }
}

export async function forgotPassword(
  req: Request,
  res: Response
) {
  try {
    const data = forgotPasswordSchema.parse(
      req.body
    );

    const admin =
      await findAdminByUsernameOrEmail(
        data.identifier
      );

    if (
      !admin ||
      !admin.is_active ||
      !admin.email
    ) {
      res.status(200).json({
        success: true,
        message: RESET_REQUEST_MESSAGE,
      });
      return;
    }

    const rawToken =
      await createPasswordResetToken(
        admin.id
      );

    const resetUrl =
      `${getFrontendUrl().replace(/\/$/, "")}/site-digital-work/admin/reset-password?token=${encodeURIComponent(rawToken)}`;

    await sendPasswordResetEmail(
      admin.email,
      resetUrl
    );

    res.status(200).json({
      success: true,
      message: RESET_REQUEST_MESSAGE,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Identifiant invalide.",
        errors: error.flatten(),
      });
      return;
    }

    console.error(
      "forgotPassword:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Impossible d'envoyer le lien de réinitialisation.",
    });
  }
}

export async function resetPassword(
  req: Request,
  res: Response
) {
  try {
    const data = resetPasswordSchema.parse(
      req.body
    );

    const success =
      await resetAdminPassword(
        data.token,
        data.password
      );

    if (!success) {
      res.status(400).json({
        success: false,
        message:
          "Le lien est invalide, expiré ou a déjà été utilisé.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message:
        "Mot de passe réinitialisé. Vous pouvez maintenant vous connecter.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message:
          "Le mot de passe doit contenir au moins 8 caractères.",
        errors: error.flatten(),
      });
      return;
    }

    console.error(
      "resetPassword:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Impossible de réinitialiser le mot de passe.",
    });
  }
}
