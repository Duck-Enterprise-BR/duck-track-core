import * as controller from "./track-find.controller";
import { Router } from "express";

export const TrackFindRoutes = Router();

TrackFindRoutes.get("/find/:code", controller.execute);