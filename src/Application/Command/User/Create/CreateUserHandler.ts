import CreateUserCommand from "Application/Command/User/Create/CreateUserCommand";
import Log from "Domain/Shared/Logger/Log";
import IUserExistInterface from "Domain/User/Repository/IUserExistInterface";
import User from "Domain/User/User";
import { Application, EventStore } from "hollywood-js";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import {inject, injectable} from "inversify";

@injectable()
export default class CreateUserHandler implements Application.ICommandHandler {
    constructor(
        @inject(Mapper.UserEventStore) private readonly eventStore: EventStore.EventStore<User>,
        @inject(Mapper.DomainService.User.UserExistInterface) private readonly userExist: IUserExistInterface,
    ) {}
    public async handle(command: CreateUserCommand): Promise<void|Application.IAppError> {

        const error = await this.failIfAggregateUuidAlreadyExist(command.uuid, command.username);

        if (error) {

            throw error;
        }

        try {

            const user = User.create(
                command.uuid,
                command.username,
            );

            await this.eventStore.save(user);

            Log.info("User was created");
        } catch (error) {

            Log.error(`Impossible to create user: ${error.message}`);
            throw error;
        }
    }

    private async failIfAggregateUuidAlreadyExist(uuid: string, username: string): Promise<void|Error> {
        if (await this.userExist.userExistByUuiAndUsername(uuid, username)) {
            Log.warn("User already exist");
            return new Error("User already exist");
        }
    }
}
