import { Router } from "express";
import { noteRoutes } from "./noteRoutes.js";
import { userRoutes } from "./userRoutes.js";

const appRouter = Router();

userRoutes(appRouter);
noteRoutes(appRouter);

export default appRouter;
