import {Client} from "elasticsearch";
import {Domain, EventStore} from "hollywood-js";
import ElasticClient from "Infrastructure/Shared/ORM/ElasticSearch/Client";

export default class EventsListener extends EventStore.EventListener {

    private readonly client: Client;

    constructor() {
        super();
        this.client = ElasticClient();
    }

    public async on(message: Domain.DomainMessage) {
        await this.client.index({
            body: message,
            index: "events",
            type: "events",
        });
    }
}
