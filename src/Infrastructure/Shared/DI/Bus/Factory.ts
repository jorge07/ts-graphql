import { Application, Domain, EventStore } from "hollywood-js";

const CommandBusBuilder = async (
    commands: Map<Application.ICommand, Application.ICommandHandler>,
): Promise<Application.CommandBus> => {
    const CommandResolver = new Application.CommandHandlerResolver();

    commands.forEach(
        (handler, command) => CommandResolver.addHandler(command, handler),
    );

    return new Application.CommandBus(CommandResolver);
};

const QueryBusBuilder = async (
    commands: Map<Application.IQuery, Application.IQueryHandler>,
): Promise<Application.QueryBus> => {
    const QueryResolver = new Application.QueryHandlerResolver();

    commands.forEach(
        (handler, command) => QueryResolver.addHandler(command, handler),
    );

    return new Application.QueryBus(QueryResolver);
};

const EventBusBuilder = (
    listeners: EventStore.EventListener[],
    subscribers: Map<any, EventStore.EventSubscriber>,
): EventStore.EventBus => {
    const EventBus = new EventStore.EventBus();

    listeners.forEach(
        (listener: EventStore.EventListener) => EventBus.addListener(listener),
    );

    subscribers.forEach(
        (subscriber: EventStore.EventSubscriber, event: Domain.DomainEvent) => EventBus.attach(event, subscriber),
    );

    return EventBus;
};

export {
    CommandBusBuilder,
    QueryBusBuilder,
    EventBusBuilder,
};
