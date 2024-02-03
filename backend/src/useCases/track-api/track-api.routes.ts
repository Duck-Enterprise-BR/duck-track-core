import { TrackApiCreateRoutes } from "./create/track-api-create.routes";
import { LocalhostMiddleware } from "../../application/middleware/localhost-middleware";
import { Router } from "express";

export const TrackApiRoutes = Router();
TrackApiRoutes.use("/track-api", LocalhostMiddleware, TrackApiCreateRoutes);