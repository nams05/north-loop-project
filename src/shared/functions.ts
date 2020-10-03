import logger from './logger';

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const createFailureResponse = (e: Error) => {
    logger.error(`Error occurred, generating failure response.`, { errMessage: e.message, stack: e.stack })
    return {
        errorMessage: e.message,
        success: false
    }
}

export const successResponse = (result: any, endpoint: string, cacheHit: boolean): any => {
    return {
        cacheHit,
        success: true,
        api: endpoint,
        data: result
    }
}

export const failureResponse = (result: any, endpoint: string, cacheHit: boolean): any => {
    return {
        cacheHit,
        success: false,
        api: endpoint,
        data: result
    }
}
