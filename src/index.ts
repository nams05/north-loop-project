import './load-env'; // Must be the first import
import server from '@server';
import logger from '@shared/logger';

// Start the server
const port = Number(process.env.PORT || 3000);
server.app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
