import {createConnection} from "typeorm";

let connection;

export default async () => {
    if (connection) {
        return connection;
    }

    return connection = await createConnection();
};
