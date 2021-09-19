import { Request } from "express";
import { IApiUser } from "src/modules/auth/auth.types";
import { UserModel } from "src/modules/auth/models/user.model";

export type IRequest = Request & {user: IApiUser}