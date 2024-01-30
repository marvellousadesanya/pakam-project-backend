import express, { Router } from "express";

import { registerUser } from "../controllers/register";
import { login } from "../controllers/login";

const router: Router = express.Router();

router.post("/", registerUser);
router.post("/login", login);

export default router;
