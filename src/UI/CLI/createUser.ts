import {BootApp, Commands} from "Infrastructure/Shared/DI";
import uuid = require("uuid");
import Log from "Domain/Shared/Logger/Log";

BootApp().then(async ({commandBus}) => {
    const userUuid = uuid.v4();
    await commandBus.handle(new Commands.CreateUserCommand(userUuid, "demo"));

    Log.info('User Demo created');
    Log.info(userUuid);
});
