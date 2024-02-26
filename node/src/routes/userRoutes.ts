import express from "express";
import { signin, signup } from "../controllers/UserController";
import { validateBodySchemaMiddleware } from "../middleware/validatorMiddleware";
import { userSchema } from "../utils/Schema";

const router = express.Router();

router.post("/signup", validateBodySchemaMiddleware(userSchema), signup);

router.post("/signin", validateBodySchemaMiddleware(userSchema), signin);

export default router;
