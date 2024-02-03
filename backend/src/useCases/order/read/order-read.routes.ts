import * as controller from "./order-read.controller";
import { Router } from "express";

export const OrderReadRoutes = Router();
OrderReadRoutes.get("/read", controller.execute);