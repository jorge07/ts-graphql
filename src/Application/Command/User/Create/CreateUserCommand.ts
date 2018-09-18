import { Application } from "hollywood-js";

export default class CreateUserCommand implements Application.ICommand {
    constructor(
        public readonly uuid: string,
        public readonly username: string,
    ) {}
}
