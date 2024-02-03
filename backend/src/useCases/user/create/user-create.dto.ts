import { UserInterface } from "../user.interface";

export interface UserCreateResponseDTO {
    token: string;
    name: string;
}

export interface UserCreateDTO extends UserInterface {
}

export interface UserTokenPayloadDTO {
    id: string;
}