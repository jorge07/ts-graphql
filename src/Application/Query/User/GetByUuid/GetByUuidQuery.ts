import { Application } from "hollywood-js";

export default class GetByUuidQuery implements Application.IQuery {
    constructor(
        public readonly uuid: string,
    ) {}
}
