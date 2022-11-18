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
}

const config: IConfig = {
	env: process.env.NODE_ENV as NodeEnv,
	port: Number(process.env.PORT),
	mongoose: {
		uri: process.env.MONGODB_URI,
		options: {},
	},
};

export default config;
