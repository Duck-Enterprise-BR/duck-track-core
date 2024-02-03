import { TrackApiCreateValidation } from "./track-api-create.validation";
import { ValidationMiddleware } from "../../../application/middleware/validation-middleware";
import * as controller from "./track-api-create.controller";
import { Router } from "express";

export const TrackApiCreateRoutes = Router();

TrackApiCreateRoutes.post("/create", ValidationMiddleware(TrackApiCreateValidation), controller.execute);

