import { AuthenticationMiddleware } from "../../application/middleware/authentication-middleware";
import { UserValidateRoutes } from "./validate/user-validate.routes";
import { UserCreateRoutes } from "./create/user-create.routes";
import { Router } from "express";

export const UserRoutes = Router();

UserRoutes.use("/user", UserCreateRoutes);
UserRoutes.use("/user/", AuthenticationMiddleware, UserValidateRoutes);