import CreateUserCommand from "Application/Command/User/Create/CreateUserCommand";
import GetByUuidQuery from "Application/Query/User/GetByUuid/GetByUuidQuery";
import { Application } from "hollywood-js";
import { CommandBusBuilder, QueryBusBuilder } from "Infrastructure/Shared/DI/Bus/Factory";
import ContainerBuilder from "Infrastructure/Shared/DI/Container/ContainerBuilder";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import createIndexes from "Infrastructure/Shared/ORM/ElasticSearch/Mapping";
import PostgresClient from "Infrastructure/Shared/ORM/Postgres/PostgresClient";
import { Container } from "inversify";

const CommandBus = async (serviceContainer: Container): Promise<Application.CommandBus> => {

    return await CommandBusBuilder(new Map([
        [
            CreateUserCommand,
            serviceContainer.get(Mapper.UseCase.Command.User.Create),
        ],
    ]));
};

const QueryBus = async (serviceContainer: Container): Promise<Application.QueryBus> => {

    return await QueryBusBuilder(new Map([
        [
            GetByUuidQuery,
            serviceContainer.get(Mapper.UseCase.Query.User.GetByUUID),
        ],
    ]));
};

const Commands = {
    CreateUserCommand,
};

const Queries = {
    GetByUuidQuery,
};

const BootApp = async (serviceContainer?: Container): Promise<{
    commandBus: Application.CommandBus,
    queryBus: Application.QueryBus,
}> => {
     await PostgresClient();
     await createIndexes();

     const container = ContainerBuilder(serviceContainer);

     return Promise.all([
        CommandBus(container),
        QueryBus(container),
    ]).then((buses: any) => {
        return {
            commandBus: buses[0] as Application.CommandBus,
            queryBus: buses[1] as Application.QueryBus,
        };
    });
};

export {
    BootApp,
    Commands,
    Queries,
};
