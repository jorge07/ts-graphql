import GetByUuidQuery from "Application/Query/User/GetByUuid/GetByUuidQuery";
import Log from "Domain/Shared/Logger/Log";
import { Application } from "hollywood-js";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import {inject, injectable} from "inversify";
import IGetUser from "Domain/User/Repository/IGetUser";

@injectable()
export default class GetByUuidHandler implements Application.IQueryHandler {

    constructor(
        @inject(Mapper.DomainService.User.UserCollection) private readonly userCollection: IGetUser,
    ) {}

    public async handle(query: GetByUuidQuery): Promise<Application.IAppResponse|Application.IAppError> {
        const user = await this.userCollection.byUuid(query.uuid);

        if (!user) {
            throw new Error("Not found");
        }

        Log.debug(`User found for: ${query.uuid}`);

        return {
            data: {
                user,
            },
        } as Application.IAppResponse;
    }
}
