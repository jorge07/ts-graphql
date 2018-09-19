export default {
    ELASTIC: {
        HOST: process.env.ELASTIC_HOST || "192.168.99.100:9200",
        MAPPING: !!process.env.ELASTIC_MAPPING,
        RECREATE: !!process.env.ELASTIC_RECREATE,
    },
};
