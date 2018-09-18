import { expect } from 'chai'
import {BootApp, Commands, Queries} from "Infrastructure/Shared/DI/index";
import { v4 } from "uuid"

let
    commandBus,
    queryBus
;

describe('UseCase: Create User', () => {

    before(async () => {
        const buses = await BootApp();
        commandBus = buses.commandBus;
        queryBus = buses.queryBus;
    });

    it('Given a valid user and uuid it should create a user', async () => {

        const uuid = v4();
        const name = 'paco' + uuid;

        await commandBus.handle(
            new Commands.CreateUserCommand(uuid, name)
        );
    });

    it('Cant create a user that already exist', (done) => {

        const uuid = v4();
        const name = 'demo' + uuid;

        commandBus.handle(
            new Commands.CreateUserCommand(uuid, name)
        ).then(()=> {

            setTimeout(()=>{
                commandBus.handle(
                    new Commands.CreateUserCommand(v4(), name)
                ).then(() => {

                    done(new Error('User already exist should throw exception'))
                })
                    .catch((err) => {
                        expect(err.message).equals('User already exist');
                        done()
                    })
                ;
            }, 1000)
        })
    });

    it('Invalid uuid must throw exception', (done) => {

        const uuid = 'kk';
        const name = 'paco' + uuid;

       commandBus.handle(
            new Commands.CreateUserCommand(uuid, name)
       ).then(
           () => done(new Error('Uuid invalid should throw exception')),
           (err) => {
               expect(err.message).equals('Cant store events: invalid input syntax for type uuid: "kk"');
               done()
           });
    });

    after(() => {
        commandBus = null;
        queryBus = null;
    });
});
