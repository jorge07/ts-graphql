import Log from "Domain/Shared/Logger/Log";
import ContainerBuilder from "Infrastructure/Shared/DI/Container/ContainerBuilder";
import Mapper from "Infrastructure/Shared/DI/Container/Mapper";
import ElasticSearchMapping from "Infrastructure/Shared/ORM/ElasticSearch/Mapping";

ContainerBuilder().get<ElasticSearchMapping>(Mapper.ESClientMapping).sync().then(() => Log.info('Done')).catch(err => Log.error(err.message));