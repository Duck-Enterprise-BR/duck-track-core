import { OrderDTO, AddOrderDTO } from "./home.dto";
import { ApiResponseInterface } from "../../src/utils/api.utils";
import { StorageService } from "../../src/services/storage.service";
import { api } from "../../src/utils/api.utils";

export class HomeService {
    private readonly storage = new StorageService();

    public async readOrders(): Promise<Array<OrderDTO>> {
        const result = await api.get<ApiResponseInterface<Array<OrderDTO>>>("/order/read")
            .catch(error => {
                throw error;
            });
        return result.data.result;
    }

    public async addOrder(props: AddOrderDTO): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await api.post("/order/create", props)
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public async getName(): Promise<string> {
        return this.storage.getName();
    }
}