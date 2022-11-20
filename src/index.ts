import mongoose from 'mongoose';
import { bootstrap } from './app';
import config from './config/config';
import { logger } from './config/logger';
import { Server } from 'http';
import { unexpectedErrorHandler } from './utils/functions';

async function start() {
	let server: Server;
	try {
		await mongoose.connect(config.mongoose.uri, config.mongoose.options);
		logger.info('Connected to MongoDB');
		const express = await import('express');
		const app = bootstrap(express.default());
		server = app.listen(config.port, () => {
			logger.info(`Listening to port ${config.port}`);
		});
		process.on('uncaughtException', unexpectedErrorHandler(server));
		process.on('unhandledRejection', unexpectedErrorHandler(server));
		process.on('SIGTERM', unexpectedErrorHandler(server));
	} catch (error) {
		unexpectedErrorHandler(server)(error);
	}
}

start();
