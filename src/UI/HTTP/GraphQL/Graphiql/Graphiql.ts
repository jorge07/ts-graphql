import {graphiqlExpress} from "apollo-server-express";
import {Express} from "express";

export default function Graphiql(express: Express): void {
    express.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
}
