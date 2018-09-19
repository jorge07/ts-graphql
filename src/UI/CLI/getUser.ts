import {BootApp, Commands, Queries} from "Infrastructure/Shared/DI";
import uuid = require("uuid");
import Log from "Domain/Shared/Logger/Log";

BootApp().then(async ({queryBus}) => {

    Log.info('Loooking for: ' + process.argv[2]);

    const user = await queryBus.ask(new Queries.GetByUuidQuery(process.argv[2]));

    Log.info(user);
});
