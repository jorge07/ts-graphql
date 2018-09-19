export default {
    DomainService: {
        User: {
            UserCollection: "user.collection",
        },
    },
    ESClient: "elastic.client",
    ESClientMapping: "elastic.mapping",
    ESEventsListener: "events.projections.elastic",
    EventStoreDBAL: "event.store.dbal",
    Projections: {
        User: {
            UserCredentialsCollections: 'user.projections.credentials'
        }
    },
    UseCase: {
        Command: {
            User: {
                Create: "user.create.handler",
            },
        },
        Query: {
            User: {
                GetByUUID: "user.get.by.uuid",
            },
        },
    },
    UserEventStore: "user.event.store",
};
