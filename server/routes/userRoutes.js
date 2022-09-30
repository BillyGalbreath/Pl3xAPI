import express from "express";
import * as UserController from "../controllers/userController.js";

const router = express.Router();

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);

export default router;
