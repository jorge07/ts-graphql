import {BootApp, Commands} from "Infrastructure/Shared/DI";

BootApp().then(async ({commandBus}) => {

    await commandBus.handle(new Commands.CreateUserCommand("123", "lol"));
});
