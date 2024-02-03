import * as controller from "./order-delete.controller";
import { Router } from "express";

export const OrderDeleteRoutes = Router();
OrderDeleteRoutes.get("/delete/:id", controller.execute);