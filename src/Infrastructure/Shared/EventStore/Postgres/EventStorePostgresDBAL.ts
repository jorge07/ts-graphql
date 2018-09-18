import { Domain, EventStore } from "hollywood-js";
import {AggregateRootId, DomainEventStream} from "hollywood-js/src/Domain/index";
import {Events} from "Infrastructure/Shared/ORM/Postgres/Projections/Events";
import {injectable} from "inversify";
import {getRepository, Repository, SelectQueryBuilder} from "typeorm";

@injectable()
export default class EventStorePostgresDBAL implements EventStore.IEventStoreDBAL {

    private readonly repo: Repository<Events>;

    constructor() {
        this.repo = getRepository<Events>(Events);
    }

    public async append(aggregateId: Domain.AggregateRootId, stream: Domain.DomainEventStream): Promise<any> {
        try {
           await this.repo.save(
               stream.events.map((message) => (Events.fromDomainMessage(message))), {
               transaction: true,
           });
        } catch (e) {
            throw new Error("Cant store events: " + e.message);
        }
    }

    public async load(aggregateId: Domain.AggregateRootId, from?: number): Promise<Domain.DomainEventStream> {

        return new Domain.DomainEventStream(
            await this.loadQuery(aggregateId, from).getMany(),
        );
    }

    public async loadFromTo(aggregateId: AggregateRootId, from?: number, to?: number): Promise<DomainEventStream> {

        return new Domain.DomainEventStream(
            await this.loadQuery(aggregateId, from, to).getMany(),
        );
    }

    private loadQuery(aggregateId: AggregateRootId, from?: number, to?: number): SelectQueryBuilder<Events> {
        const query = this.repo
            .createQueryBuilder("events")
            .where("events.uuid = :uuid",  {
                uuid: aggregateId,
            })
            .orderBy("playhead")
        ;

        if (from) {
            query.andWhere("events.playhead >= :playhead",  { playhead: from });
        }

        if (to) {
            query.andWhere("events.playhead <= :playhead", { playhead: to });
        }

        return query;
    }
}
