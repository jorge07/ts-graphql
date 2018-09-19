import {EventStore} from "hollywood-js";
import {Container, decorate, injectable} from "inversify";
import "reflect-metadata";
import CreateUserHandler from "Application/Command/User/Create/CreateUserHandler";
import GetByUuidHandler from "Application/Query/User/GetByUuid/GetByUuidHandler";
import IUserExistInterface from "Domain/User/Repository/IUserExistInterface";
import EventStorePostgresDBAL from "Infrastructure/Shared/EventStore/Postgres/EventStorePostgresDBAL";
import ElasticClient from "Infrastructure/Shared/ORM/ElasticSearch/Client";
import UserCollection from "Infrastructure/User/ReadModel/ElasticSearch/UserCollection";
import Mapper from "src/Infrastructure/Shared/DI/Container/Mapper";
import ElasticSearchMapping from "Infrastructure/Shared/ORM/ElasticSearch/Mapping";
import ElasticEventsListener from "Infrastructure/Shared/ORM/ElasticSearch/Projections/ElasticEventsListener";
import UserCredentialsCollections from "Infrastructure/User/ReadModel/Projections/UserCredentialsCollections";
import User from "Domain/User/User";
import Log from "Domain/Shared/Logger/Log";
import EventStoreFactory from "Infrastructure/Shared/DI/EventStore/User";
import IGetUser from "Domain/User/Repository/IGetUser";

decorate(injectable(), EventStore.EventListener);
decorate(injectable(), EventStore.EventSubscriber);
decorate(injectable(), EventStore.EventStore);

const UserEventStore = new EventStoreFactory();

export default function ContainerBuilder(): Container {

    const container = new Container();

    Log.debug('Creating Container');


    container.bind(Mapper.ESClient).toDynamicValue(ElasticClient);
    container.bind<EventStorePostgresDBAL>(Mapper.EventStoreDBAL).to(EventStorePostgresDBAL);
    container.bind<ElasticSearchMapping>(Mapper.ESClientMapping).to(ElasticSearchMapping);
    container.bind<ElasticEventsListener>(Mapper.ESEventsListener).to(ElasticEventsListener);

    container.bind<UserCredentialsCollections>(Mapper.Projections.User.UserCredentialsCollections).to(UserCredentialsCollections);
    container.bind<IUserExistInterface>(Mapper.DomainService.User.UserCollection).to(UserCollection);
    container.bind<EventStore.EventStore<User>>(Mapper.UserEventStore).toDynamicValue(() => UserEventStore.userStore(container));

    container.bind<CreateUserHandler>(Mapper.UseCase.Command.User.Create).to(CreateUserHandler);
    container.bind<GetByUuidHandler>(Mapper.UseCase.Query.User.GetByUUID).to(GetByUuidHandler);

    return container;
}
