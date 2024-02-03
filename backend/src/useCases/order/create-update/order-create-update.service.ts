import { OrderCreateUpdateDTO, OrderCreateResponseDTO } from "./order-create-update.dto";
import { ApplicationBaseResponse } from "../../../application/base/application-base.response";
import { ApplicationBaseService } from "../../../application/base/application-base.service";
import { OrderCacheRepository } from "../order.cache-repository";
import { TrackOrdersQueue } from "../../../queues/track/track-orders.queue";
import { UserInterface } from "../../user/user.interface";
import { OrderModel } from "../order.model";

export class OrderCreateUpdateService extends ApplicationBaseService {
    private readonly trackQueue = new TrackOrdersQueue();
    private readonly cache = new OrderCacheRepository();

    public async execute(data: OrderCreateUpdateDTO, user: UserInterface): Promise<ApplicationBaseResponse<OrderCreateResponseDTO>> {

        const create = {
            name: data.name,
            code: data.code,
            userId: user._id
        };

        await this.cache.clearAll();

        const result = await OrderModel.updateOne({ enabled: true, userId: user._id, code: data.code }, {
            $set: create
        }).exec();

        if (result.modifiedCount > 0) {
            await this.trackQueue.add({ code: data.code, priority: true });
            return new ApplicationBaseResponse<OrderCreateResponseDTO>({ message: "Encomenda atualizada!" });
        }

        await OrderModel.create(create);

        await this.trackQueue.add({ code: data.code, priority: true });

        return new ApplicationBaseResponse<OrderCreateResponseDTO>({ message: "Encomenda criada!" });
    }
}