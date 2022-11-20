import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

type NodeEnv = 'development' | 'production';

interface IConfig {
	env: NodeEnv;
	port: number;
	mongoose: {
		uri: string;
		options: mongoose.ConnectOptions;
	};
	jwt: {
		secret: string;
		accessExpirationMinutes: number;
		refreshExpirationDays: number;
		resetPasswordExpirationMinutes: number;
		verifyEmailExpirationMinutes: number;
	};
}

const config: IConfig = {
	env: process.env.NODE_ENV as NodeEnv,
	port: Number(process.env.PORT),
	mongoose: {
		uri: process.env.MONGODB_URI,
		options: {},
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		accessExpirationMinutes: Number(
			process.env.JWT_ACCESS_EXPIRATION_MINUTES
		),
		refreshExpirationDays: Number(process.env.JWT_REFRESH_EXPIRATION_DAYS),
		resetPasswordExpirationMinutes: Number(
			process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES
		),
		verifyEmailExpirationMinutes: Number(
			process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
		),
	},
};

export default config;
