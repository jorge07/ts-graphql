import { graphqlExpress } from "apollo-server-express";
import * as bodyParser from "body-parser";
import Log from "Domain/Shared/Logger/Log";
import * as express from "express";
import {Express} from "express";
import { makeExecutableSchema } from "graphql-tools";
import { Application } from "hollywood-js";
import {Server} from "http";
import {BootApp} from "Infrastructure/Shared/DI";
import resolvers from "UI/HTTP/GraphQL/Resolvers";
import typeDefs from "UI/HTTP/GraphQL/Schema/index";

export class HttpServer {
    public readonly app: express.Express;
    private readonly command: Application.CommandBus;
    private readonly query: Application.QueryBus;
    private server: Server;

    constructor(commandBus: Application.CommandBus, queryBus: Application.QueryBus) {
        this.command = commandBus;
        this.query = queryBus;
        this.app = express();
        this.graqhQL();
    }

    public decorate(middlewares: Array<(app: Express) => void>): HttpServer {

        middlewares.forEach((middleware) => {
            middleware(this.app);
        });

        return this;
    }

    public start(port: number = 3000): void {
        this.server = this.app.listen({ port }, () => {
            Log.info(`🔊 Server ready at http://127.0.0.1:${port}`);
            process.on("SIGTERM", this.stop);
        });
    }

    public stop(): void {
        this.server.close(() => {
            Log.warn(`🔇 App stopped!`);
            process.exit(0);
        });
    }

    private graqhQL(): void {
        this.app
            .use(
            "/graphql",
            bodyParser.json(),
            graphqlExpress({
                context: {
                    ask: async (query) => await this.query.ask(query),
                    handle: async (command) => await this.command.handle(command),
                },
                schema: makeExecutableSchema({
                    resolvers,
                    typeDefs,
                }),
            }),
        );
    }
}

export default async function ServerFactory(serviceContainer?): Promise<HttpServer> {
    const {commandBus, queryBus} = await BootApp(serviceContainer);

    return new HttpServer(commandBus, queryBus);
}
