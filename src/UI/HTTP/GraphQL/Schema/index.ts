import CreateUser from "UI/HTTP/GraphQL/Schema/Command/User/Create";
import User from "UI/HTTP/GraphQL/Schema/Query/User";

const Mutations: string = `
  type Mutation {
    ${CreateUser}
  }
`;
const Query: string = `
  type Query {
    user(uuid: String!): User
  }
`;

const SchemaDefinition: string = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const Schema = [SchemaDefinition, Query, User, Mutations];

export default Schema;
