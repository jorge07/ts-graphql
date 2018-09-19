import IUserExistInterface from "Domain/User/Repository/IUserExistInterface";
import {Client, SearchResponse} from "elasticsearch";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import { inject, injectable } from "inversify";
import IGetUser from "Domain/User/Repository/IGetUser";
import Log from "Domain/Shared/Logger/Log";

@injectable()
export default class UserCollection implements IUserExistInterface, IGetUser {

    constructor(@inject(Mapper.ESClient) private readonly client: Client) {}

    public async userExistByUuiAndUsername(uuid: string, username: string): Promise<boolean> {
        const responses = await Promise.all([
            this.client.search({
                body: {
                    query: {
                        term: {
                            _id: uuid,
                        },
                    },
                },
                index: "user_credentials",
                size: 0,
                terminateAfter: 1,
                type: "user_credentials",
            }),
            this.client.search({
                body: {
                    query: {
                        term: {
                            username,
                        },
                    },
                },
                index: "user_credentials",
                size: 0,
                terminateAfter: 1,
                type: "user_credentials",
            }),
        ]);

        return responses[0].hits.total !== 0 || responses[1].hits.total !== 0;
    }
    public async byUuid(uuid: string): Promise<any> {
        const response: SearchResponse<any> = await this.client.search<any>({
            body: {
                query: {
                    term: {
                        _id: uuid,
                    },
                },
            },
            index: "user_credentials",
            type: "user_credentials",
        });

        if (response.hits.total === 0) {
            return null;
        }

        return response.hits.hits[0]._source;
    }
}
