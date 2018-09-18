import {Client} from "elasticsearch";
import Config from "Infrastructure/Shared/Config";

let client: Client|null = null;

export default function ElasticClient(): Client {
    return client || (client = new Client({
        host: Config.ELASTIC.HOST,
        log: process.env.SILENT_LOGS ? "error" : "trace",
    }));
}
