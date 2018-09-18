import CreateUserHandler from "Application/Command/User/Create/CreateUserHandler";
import GetByUuidHandler from "Application/Query/User/GetByUuid/GetByUuidHandler";
import IUserExistInterface from "Domain/User/Repository/IUserExistInterface";
import {UserEventStore} from "Infrastructure/Shared/DI/EventStore/User";
import EventStorePostgresDBAL from "Infrastructure/Shared/EventStore/Postgres/EventStorePostgresDBAL";
import ElasticClient from "Infrastructure/Shared/ORM/ElasticSearch/Client";
import UserExist from "Infrastructure/User/ReadModel/ElasticSearch/UserExist";
import {Container} from "inversify";
import Mapper from "src/Infrastructure/Shared/DI/Container/Mapper";

export default function ContainerBuilder(serviceContainer): Container {

    const container = new Container();

    container.bind<EventStorePostgresDBAL>(Mapper.EventStoreDBAL).to(EventStorePostgresDBAL);
    container.bind<CreateUserHandler>(Mapper.UseCase.Command.User.Create).to(CreateUserHandler);
    container.bind<GetByUuidHandler>(Mapper.UseCase.Query.User.GetByUUID).to(GetByUuidHandler);
    container.bind<IUserExistInterface>(Mapper.DomainService.User.UserExistInterface).to(UserExist);
    container.bind(Mapper.UserEventStore).toDynamicValue(() => UserEventStore(container));
    container.bind(Mapper.ESClient).toDynamicValue(ElasticClient);

    return container;
}
