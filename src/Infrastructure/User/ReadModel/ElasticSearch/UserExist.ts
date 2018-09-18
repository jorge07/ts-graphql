import IUserExistInterface from "Domain/User/Repository/IUserExistInterface";
import { Client } from "elasticsearch";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import { inject, injectable } from "inversify";

@injectable()
export default class UserExist implements IUserExistInterface {

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
}
