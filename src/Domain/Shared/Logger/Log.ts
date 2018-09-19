import * as winston from "winston";

const logger = winston.createLogger({
    exitOnError: false,
    format: winston.format.json(),
    level: "info",
    transports: [
        new winston.transports.Console({
            silent: Boolean(process.env.SILENT_LOGS),
            stderrLevels: [
                "warn",
                "error",
            ],
        }),
    ],
});

const debug = (msg: any, context?: any) => logger.debug(msg, context);
const info = (msg: any, context?: any) => logger.info(msg, context);
const warn = (msg: any, context?: any) => logger.warn(msg, context);
const error = (msg: any, context?: any) => logger.error(msg, context);

export default {
    debug,
    error,
    info,
    warn,
};
