/**
 * Setup the winston logger.
 *
 * Documentation: https://github.com/winstonjs/winston
 */

import { createLogger, format, transports } from 'winston';
import Transport = require('winston-transport');
import {logToWebSocket} from '../services/internal/websocket'

// Import Functions
const { File, Console } = transports;

// Init Logger
const logger = createLogger({
    level: 'info',
});

class WebSocketTransport extends Transport {
    constructor(opts: any) {
        super(opts);
    }

    log(info: any, callback: any) {
        callRemoteService(info)
            .then((result: any) => {
                callback(null, result);
                this.emit('logged', info);
            })
            .catch((error: any) => {
                callback(error);
                this.emit('error', error);
            })
    }
}

const callRemoteService = async (info: any) => {
    // tslint:disable-next-line:no-console
    return logToWebSocket(info.message)
}
/**
 * For production write to all logs with level `info` and below
 * to `combined.log. Write all logs error (and below) to `error.log`.
 * For development, print to the console.
 */
if (process.env.NODE_ENV === 'production') {

    const fileFormat = format.combine(
        format.timestamp(),
        format.json(),
    );
    const errTransport = new File({
        filename: './logs/error.log',
        format: fileFormat,
        level: 'error',
    });
    const infoTransport = new File({
        filename: './logs/combined.log',
        format: fileFormat,
    });
    logger.add(errTransport);
    logger.add(infoTransport);
    const websocketTransport = new WebSocketTransport({})
    logger.add(websocketTransport)
} else {

    const errorStackFormat = format((info) => {
        if (info.stack) {
            // tslint:disable-next-line:no-console
            console.log(info.stack);
            return false;
        }
        return info;
    });
    const consoleTransport = new Console({
        format: format.combine(
            format.colorize(),
            format.simple(),
            errorStackFormat(),
        ),
    });
    const websocketTransport = new WebSocketTransport({})
    logger.add(consoleTransport);
    logger.add(websocketTransport)
}

export default logger;
