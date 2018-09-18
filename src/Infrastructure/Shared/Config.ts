export default {
    ELASTIC: {
        HOST: process.env.ELASTIC_HOST || "127.0.0.1:9200",
        MAPPING: process.env.ELASTIC_MAPPING || "true",
        RECREATE: process.env.ELASTIC_RECREATE || "false",
    },
};
