import { AuthenticationMiddleware } from "../../application/middleware/authentication-middleware";
import { OrderCreateUpdateRoutes } from "./create-update/order-create-update.routes";
import { OrderDeleteRoutes } from "./delete/order-delete.routes";
import { OrderReadRoutes } from "./read/order-read.routes";
import { Router } from "express";

export const OrderRoutes = Router();
OrderRoutes.use("/order", AuthenticationMiddleware, OrderCreateUpdateRoutes);
OrderRoutes.use("/order", AuthenticationMiddleware, OrderReadRoutes);
OrderRoutes.use("/order", AuthenticationMiddleware, OrderDeleteRoutes);