import { expect } from 'chai'
import {BootApp, Commands, Queries} from "Infrastructure/Shared/DI/index";
import { v4 } from "uuid"

let
    commandBus,
    queryBus
;

describe('UseCase: Get User By Uuid', () => {

    before(async () => {
        const buses = await BootApp();
        commandBus = buses.commandBus;
        queryBus = buses.queryBus;
    });

    it('Given a valid user uuid it should retrieve a user', (done) => {

        const uuid = v4();
        const name = 'paco' + uuid;

        commandBus.handle(
            new Commands.CreateUserCommand(uuid, name)
        ).then(
            () => {
                return new Promise((resolve) => setTimeout(async () => {
                    const response = await queryBus.ask(new Queries.GetByUuidQuery(uuid));

                    const value = {
                        data: {
                            user: {
                                uuid: uuid,
                                username: name
                            }
                        }
                    };

                    expect(response).to.deep.equal(value);
                    resolve();
                }, 1000));
            }
        ).then(done);
    });

    it('User not found must throw exception', (done) => {

        const uuid = v4();

        queryBus.ask(
            new Queries.GetByUuidQuery(uuid)
        ).then(
            () => done(new Error('Not found user must throw exception')),
            (err) => {
                expect(err.message).equals('Not found');
                done()
            });
    });
});
