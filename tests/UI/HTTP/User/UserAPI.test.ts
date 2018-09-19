import * as supertest from "supertest"
import TestApp from "../testServer";
import { v4 } from "uuid";
import PostgresClient from "Infrastructure/Shared/ORM/Postgres/PostgresClient";
import Log from "Domain/Shared/Logger/Log";

describe('Acceptance test', () => {
    it('Create user with uuid -> lol and can retrieve the user', async () => {

        const { app } = await TestApp();
        const request: supertest.SuperTest<supertest.Test> = supertest(app);
        const userUuid = v4();
        const userName = 'Paco' + (new Date()).toTimeString();

        await request.post('/graphql')
            .send({
                query: `mutation { CreateUser(uuid: "${userUuid}", username: "${userName}") }`
            })
            .expect({
                data: {
                    CreateUser:  "ok"
                }
            });

        return new Promise((resolve, reject) => setTimeout(
            async () => {
                await request.post('/graphql')
                    .send({
                        query: `query { user(uuid: "${userUuid}") { uuid username} }`
                    })
                    .expect({
                        data: {
                            user: {
                                username: userName,
                                uuid: userUuid
                            }
                        }
                    }).catch(reject);

                await request.post('/graphql')
                    .send({
                        query: `query { user(uuid: "${userUuid}") { username} }`
                    })
                    .expect({
                        data: {
                            user: {
                                username: userName
                            }
                        }
                    }).catch(reject);
                resolve();
            }, 1000)
        );

    });

    after(async () => {
        const connection = await PostgresClient();
        Log.info('Close connection');
        connection.close();
    })
});


