import { config } from "@src/config";
import winston, { format } from "winston";

const { name } = config;

const loggerFormat = format.printf(({ level, message, timestamp, label }) => {
    return `[${timestamp}][${label}][${level}]: ${message}`;
});

const logger = winston.createLogger({
    format: format.combine(
        format.colorize(),
        format.label({ label: name }),
        format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
        loggerFormat,
    ),
    transports: [
        new winston.transports.Console(),
        // TODO: Add logs for a file
    ],
});

export { logger }
