import { logger } from '../config/logger';
import { Server } from 'http';

export const unexpectedErrorHandler = (server: Server) => (error: unknown) => {
	logger.error(error);
	if (server) {
		server.close(() => {
			logger.info('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};
