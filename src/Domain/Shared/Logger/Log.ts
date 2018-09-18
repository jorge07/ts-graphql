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

const info = (msg: string, context?: any) => logger.info(msg, context);
const warn = (msg: string, context?: any) => logger.warn(msg, context);
const error = (msg: string, context?: any) => logger.error(msg, context);

export default {
    error,
    info,
    warn,
};
