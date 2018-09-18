import Log from "Domain/Shared/Logger/Log";
import {Client} from "elasticsearch";
import Config from "Infrastructure/Shared/Config";
import ElasticClient from "src/Infrastructure/Shared/ORM/ElasticSearch/Client";

const ElasticSearch: Client = ElasticClient();

const indices = ElasticSearch.indices;

export default async function createIndexes() {

    if (Config.ELASTIC.MAPPING !== "true") {

        return;
    }

    if (Config.ELASTIC.RECREATE === "true") {

        Log.info("Recreating indexes");

        if (await indices.exists({index: "user_credentials"})) {
            await indices.delete({index: "user_credentials"});
        }

        if (await indices.exists({index: "events"})) {
            await indices.delete({index: "events"});
        }
    }

    if (!await indices.exists({index: "events"})) {
        await indices.create({index: "events"});
    }

    if (!await indices.exists({index: "user_credentials"})) {
        await indices.create({index: "user_credentials"});
    }

    await indices.putMapping({
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
