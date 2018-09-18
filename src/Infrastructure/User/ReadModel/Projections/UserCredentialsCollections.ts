import UserWasCreated from "Domain/User/Events/UserWasCreated";
import { Client } from "elasticsearch";
import { EventStore } from "hollywood-js";

export default class UserCredentialsCollections extends EventStore.EventSubscriber {
    private readonly client: Client;

    constructor(client: Client) {
        super();
        this.client = client;
    }

    public async onUserWasCreated(event: UserWasCreated): Promise<void> {
        await this.client.create({
            body: {
                username: event.username,
                uuid: event.uuid,
            },
            id: event.uuid,
            index: "user_credentials",
            type: "user_credentials",
            waitForActiveShards: "1",
        });
    }
}
