import Log from "Domain/Shared/Logger/Log";
import track from "Infrastructure/Shared/APM";
import Graphiql from "UI/HTTP/GraphQL/Graphiql/Graphiql";
import Voyager from "UI/HTTP/GraphQL/Voyager/Voyager";
import ServerFactory, { HttpServer } from "UI/HTTP/Server/Server";

if (process.env.APM) {
    track();
}

ServerFactory()
    .then(
        (app: HttpServer) => {

            if (!!process.env.DEV_TOOLS) {
                app.decorate([
                    Voyager,
                    Graphiql,
                ]);
            }

            app.start();
        },
        (err: Error) => Log.error(err.message),
    )
;
