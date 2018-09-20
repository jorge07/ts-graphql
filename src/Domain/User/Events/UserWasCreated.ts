import { Domain } from "hollywood-js";
import Username from "Domain/User/ValueObject/Username";

export default class UserWasCreated extends Domain.DomainEvent {
    constructor(
        public readonly uuid: Domain.AggregateRootId,
        public readonly username: Username,
    ) {
        super();
    }
}
