import ServerFactory, {HttpServer} from "UI/HTTP/Server/Server";

export default function TestApp(): Promise<HttpServer> {
    return ServerFactory()
};
