import CreateUser from "UI/HTTP/GraphQL/Resolvers/Command/User/Create";
import GetByUuid from "UI/HTTP/GraphQL/Resolvers/Query/User/GetByUuid";

export default {
    Mutation: {
        CreateUser,
    },
    Query: {
        user: GetByUuid,
    },
};
