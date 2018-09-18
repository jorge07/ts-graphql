import * as supertest from "supertest"
import TestApp from "../testServer";
import { v4 } from "uuid";

it('Create user with uuid -> lol and can retrieve the user', async () => {

    const { app } = await TestApp();
    const request: supertest.SuperTest<supertest.Test> = supertest(app);
    const userUuid = v4();
    const userName = 'Paco' + (new Date()).toTimeString();

    return await request.post('/graphql')
        .send({
            query: `mutation { CreateUser(uuid: "${userUuid}", username: "${userName}") }`
        })
        .expect({
            data: {
                CreateUser:  "ok"
            }
        }).then(()=>{
            return request.post('/graphql')
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
                })
        }).then(()=>{
            return request.post('/graphql')
                .send({
                    query: `query { user(uuid: "${userUuid}") { username} }`
                })
                .expect({
                    data: {
                        user: {
                            username: userName
                        }
                    }
                })
        })
});
