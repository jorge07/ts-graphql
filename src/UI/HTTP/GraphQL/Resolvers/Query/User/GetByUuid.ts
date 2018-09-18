import GetByUuidQuery from "Application/Query/User/GetByUuid/GetByUuidQuery";
import { GraphQLError } from "graphql";

export default async (root, { uuid }, context) => {
    try {
        const { data } = await context.ask(new GetByUuidQuery(uuid));

        return data.user;
    } catch (err) {

        return new GraphQLError(err.message);
    }
};
