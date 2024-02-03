import { AxiosResponse, AxiosError } from "axios";
import { LoginDTO, LoginApiDTO } from "./login.dto";
import { ApiResponseInterface } from "../../src/utils/api.utils";
import { StorageService } from "../../src/services/storage.service";
import * as Application from "expo-application";
import { v4 as id } from "uuid";
import * as device from "expo-device";
import * as utils from "../../src/utils/notifications.utils";
import { api } from "../../src/utils/api.utils";

export class LoginService {
    private readonly storage = new StorageService();

    public async execute(props: LoginDTO): Promise<void> {
        const data: LoginApiDTO = {
            name: props.name ?? "null",
            brand: device.brand ?? "undefined",
            deviceId: Application.androidId ?? id(),
            tokenNotification: await utils.getToken(),
            os: `${ device.osName } ${ device.osVersion }`
        }

        const result = <AxiosResponse<ApiResponseInterface<{
            token: string,
            name: string
        }>>>await api.post("/user/create", data)
            .catch((error: AxiosError) => {
                throw error.response?.data;
            });

        await this.storage.setToken(result.data.result.token);
        await this.storage.setName(props.name);
    }
}