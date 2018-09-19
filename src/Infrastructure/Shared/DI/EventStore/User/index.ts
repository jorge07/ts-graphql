import UserWasCreated from "Domain/User/Events/UserWasCreated";
import User from "Domain/User/User";
import { EventStore } from "hollywood-js";
import { EventBusBuilder } from "Infrastructure/Shared/DI/Bus/Factory";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import ElasticEventsListener from "Infrastructure/Shared/ORM/ElasticSearch/Projections/ElasticEventsListener";
import UserCredentialsCollections from "Infrastructure/User/ReadModel/Projections/UserCredentialsCollections";
import {Container, injectable} from "inversify";
import Log from "Domain/Shared/Logger/Log";

@injectable()
export default class EventStoreFactory {
    private userEventStore;

    private buildEventBus(container: Container): EventStore.EventBus {
        return EventBusBuilder([
                container.get<ElasticEventsListener>(Mapper.ESEventsListener),
            ],
            new Map([
                [
                    UserWasCreated,
                    container.get<UserCredentialsCollections>(Mapper.Projections.User.UserCredentialsCollections)
                ],
            ]),
        )
    }

    public userStore(container: Container) {
        if (this.userEventStore) {

            return this.userEventStore;
        }

        return this.userEventStore = new EventStore.EventStore<User>(
            User,
            container.get<EventStore.IEventStoreDBAL>(Mapper.EventStoreDBAL),
            this.buildEventBus(container)
        );
    }
}