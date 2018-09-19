import {Client} from "elasticsearch";
import {Domain, EventStore} from "hollywood-js";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import {inject, injectable, decorate} from "inversify";

@injectable()
export default class ElasticEventsListener extends EventStore.EventListener {

    constructor(@inject(Mapper.ESClient) private readonly client: Client) {
        super();
    }

    public async on(message: Domain.DomainMessage) {
        await this.client.index({
            body: message,
            index: "events",
            type: "events",
        });
    }
}
