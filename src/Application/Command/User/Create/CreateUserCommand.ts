import { Application } from "hollywood-js";
import Username from "Domain/User/ValueObject/Username";

export default class CreateUserCommand implements Application.ICommand {
    public readonly username: Username;
    constructor(
        public readonly uuid: string,
        username: string,
    ) {
        this.username = new Username(username);
    }
}
