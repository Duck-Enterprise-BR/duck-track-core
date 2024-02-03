import { TrackApiRoutes } from "./useCases/track-api/track-api.routes";
import { UserRoutes } from "./useCases/user/user.routes";
import { OrderRoutes } from "./useCases/order/order.routes";
import { TrackRoutes } from "./useCases/track/track.routes";
import { Router } from "express";

export const ServerRoutes = Router();

ServerRoutes.use(UserRoutes);
ServerRoutes.use(OrderRoutes);
ServerRoutes.use(TrackRoutes);

//Localhost
ServerRoutes.use(TrackApiRoutes);