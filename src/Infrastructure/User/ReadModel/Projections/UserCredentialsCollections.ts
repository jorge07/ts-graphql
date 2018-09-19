import UserWasCreated from "Domain/User/Events/UserWasCreated";
import { Client } from "elasticsearch";
import { EventStore } from "hollywood-js";
import {inject, injectable} from "inversify";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";

@injectable()
export default class UserCredentialsCollections extends EventStore.EventSubscriber {

    constructor(@inject(Mapper.ESClient) private readonly client: Client) {
        super();
    }

    protected async onUserWasCreated(event: UserWasCreated): Promise<void> {
        await this.client.create({
            body: {
                username: event.username,
                uuid: event.uuid,
            },
            id: event.uuid,
            index: "user_credentials",
            type: "user_credentials",
            refresh: "wait_for",
        });
    }
}
