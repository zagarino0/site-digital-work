import { Router } from "express";

import {
  bootstrapAdminAccount,
  forgotPassword,
  login,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/bootstrap-admin", bootstrapAdminAccount);
router.post("/login", login);
router.post(
  "/forgot-password",
  forgotPassword
);
router.post(
  "/reset-password",
  resetPassword
);

export default router;
