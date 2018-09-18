import {Express} from "express";
import voyager from "graphql-voyager/middleware/express";

export default function Voyager(express: Express): void {
    express.use("/voyager", voyager({ endpointUrl: "/graphql" }));
}
