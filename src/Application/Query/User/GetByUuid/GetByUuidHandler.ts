import GetByUuidQuery from "Application/Query/User/GetByUuid/GetByUuidQuery";
import Log from "Domain/Shared/Logger/Log";
import User from "Domain/User/User";
import { Application, EventStore } from "hollywood-js";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import {inject, injectable} from "inversify";

@injectable()
export default class GetByUuidHandler implements Application.IQueryHandler {

    constructor(
        @inject(Mapper.UserEventStore) private readonly eventStore: EventStore.EventStore<User>,
    ) {}
    public async handle(query: GetByUuidQuery): Promise<Application.IAppResponse|Application.IAppError> {
        const user = await this.eventStore.load(query.uuid);

        if (!user) {
            throw new Error("Not found");
        }

        Log.info(`User found for: ${query.uuid}`);

        return {
            data: {
                user,
            },
        } as Application.IAppResponse;
    }
}
