export default {
    DomainService: {
        User: {
            UserExistInterface: "user.exist",
        },
    },
    ESClient: "elastic.client",
    EventStoreDBAL: "event.store.dbal",
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
