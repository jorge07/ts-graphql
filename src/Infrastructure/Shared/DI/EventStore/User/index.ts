import UserWasCreated from "Domain/User/Events/UserWasCreated";
import User from "Domain/User/User";
import { EventStore } from "hollywood-js";
import { EventBusBuilder } from "Infrastructure/Shared/DI/Bus/Factory";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import EventsListener from "Infrastructure/Shared/ORM/ElasticSearch/Projections/EventsListener";
import UserCredentialsCollections from "Infrastructure/User/ReadModel/Projections/UserCredentialsCollections";
import {Container} from "inversify";

const EventBus = (container: Container) => (
    EventBusBuilder([
            new EventsListener(),
        ],
        new Map([
            [UserWasCreated, new UserCredentialsCollections(container.get(Mapper.ESClient))],
        ]),
    )
);

const UserEventStore = (container: Container) => new EventStore.EventStore<User>(
    User,
    container.get(Mapper.EventStoreDBAL),
    EventBus(container),
);

export {
    UserEventStore,
};
