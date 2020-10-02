import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/logger';

import expressWs from 'express-ws'
import {sendToSingleWSClient} from './services/internal/websocket'

// Init express
const server = expressWs(express())
const app = server.app


/************************************************************************************
 *                              Enable web socket: express-ws
 ***********************************************************************************/
app.ws('/api/logger/socket', async (ws, req) => {
    await sendToSingleWSClient(ws, 'Connected to websocket.')
    ws.on('message', async (message) => {
        await sendToSingleWSClient(ws, { message })
    })
})


/************************************************************************************
 *                              Set basic express stuff
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'script-src \'self\' https://ajax.googleapis.com https://maxcdn.bootstrapcdn.com');
    return next();
});


/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('*', (req: Request, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default server;
