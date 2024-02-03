import { AuthenticationMiddleware } from "../../application/middleware/authentication-middleware";
import { TrackFindRoutes } from "./find/track-find.routes";
import { Router } from "express";

export const TrackRoutes = Router();
TrackRoutes.use("/track", AuthenticationMiddleware, TrackFindRoutes);