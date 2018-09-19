import {Client, Indices} from "elasticsearch";
import Log from "Domain/Shared/Logger/Log";
import Config from "Infrastructure/Shared/Config";
import {inject, injectable} from "inversify";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";

@injectable()
export default class ElasticSearchMapping {

    private readonly indices: Indices;

    constructor(@inject(Mapper.ESClient) private readonly client: Client){
        this.indices = client.indices
    }

    public async sync(): Promise<void> {
        if (Config.ELASTIC.MAPPING !== true) {

            return;
        }

        await this.recreate();

        await this.userCredentials();
    }

    private async userCredentials(): Promise<void> {
        await this.indices.putMapping({
            body: {
                properties: {
                    username: {type: "keyword"},
                    uuid: {type: "keyword"},
                },
            },
            index: "user_credentials",
            type: "user_credentials",
        });

        Log.info("Created index user_credentials");
    }

    private async recreate(): Promise<void> {
        if (Config.ELASTIC.RECREATE !== true) {

            return;
        }

        Log.info("Recreating indexes");

        if (await this.indices.exists({index: "user_credentials"})) {
            Log.info("Delete user_credentials");
            await this.indices.delete({index: "user_credentials"});
        }

        if (await this.indices.exists({index: "events"})) {
            Log.info("Delete events");
            await this.indices.delete({index: "events"});
        }

        if (!await this.indices.exists({index: "events"})) {
            await this.indices.create({
                index: "events",
            });
        }

        if (!await this.indices.exists({index: "user_credentials"})) {
            await this.indices.create({
                index: "user_credentials",
            });
        }
    }
}
