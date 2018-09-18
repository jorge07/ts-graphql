import { Domain } from "hollywood-js";

export default class UserWasCreated extends Domain.DomainEvent {
    constructor(
        public readonly uuid: Domain.AggregateRootId,
        public readonly username: string,
    ) {
        super();
    }
}
