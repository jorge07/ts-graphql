import UserWasCreated from "Domain/User/Events/UserWasCreated";
import { Domain } from "hollywood-js";

export default class User extends Domain.EventSourced {

    public static create(
        uuid: Domain.AggregateRootId,
        username: string,
    ): User {
        const instance = new User();

        instance.uuid = uuid;

        instance.raise(new UserWasCreated(uuid, username));

        return instance;
    }

    private uuid: Domain.AggregateRootId;
    private username: string;

    constructor() {
        super();
    }

    public getUsername(): string {

        return this.username;
    }

    public getAggregateRootId(): Domain.AggregateRootId {
        return this.uuid;
    }

    protected applyUserWasCreated(event: UserWasCreated): void {
        this.uuid = event.uuid;
        this.username = event.username;
    }
}
