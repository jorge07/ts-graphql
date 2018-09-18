import CreateUserCommand from "Application/Command/User/Create/CreateUserCommand";
import { GraphQLError } from "graphql";
import {Application} from "hollywood-js";

export default async (root, { uuid, username}, context) => {
    try {
        const err: Application.IAppError = await context.handle(new CreateUserCommand(uuid, username));

        if (err) {
            return new GraphQLError(err.message);
        }

        return "ok";
    } catch (err) {

        return new GraphQLError(err.message);
    }
};
