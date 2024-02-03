import { UserCreateDTO, UserCreateResponseDTO } from "./user-create.dto";
import { ApplicationBaseResponse } from "../../../application/base/application-base.response";
import { ApplicationBaseService } from "../../../application/base/application-base.service";
import { environment } from "../../../environment";
import { UserModel } from "../user.model";
import * as jwt from "jsonwebtoken";

export class UserCreateService extends ApplicationBaseService {
    public async execute(data: UserCreateDTO): Promise<ApplicationBaseResponse<UserCreateResponseDTO>> {
        const userExist = await UserModel.findOne({ enabled: true, deviceId: data.deviceId })
            .exec();

        if (userExist) {
            const token: string = jwt.sign(JSON.stringify({ _id: userExist._id }), environment.tokenPassword);

            await UserModel.updateOne({ enabled: true, _id: userExist._id }, {
                $set: {
                    name: data.name,
                    tokenNotification: data.tokenNotification,
                }
            }).exec();

            const userUpdated = await UserModel.findOne({ enabled: true, _id: userExist._id })
                .exec();

            return new ApplicationBaseResponse<UserCreateResponseDTO>({ token: token, name: userUpdated?.name ?? "" });
        }

        const user = await UserModel.create(data);

        const token: string = jwt.sign(JSON.stringify({ _id: user._id }), environment.tokenPassword);

        return new ApplicationBaseResponse<UserCreateResponseDTO>({ token: token, name: user.name });
    }
}