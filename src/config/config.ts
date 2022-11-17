import dotenv from 'dotenv';
import path from 'path';

type NodeEnv = 'development' | 'production';

interface IConfig {
	env: NodeEnv;
	port: number;
}

dotenv.config({ path: path.join(__dirname, '../../.env') });

const config: IConfig = {
	env: process.env.NODE_ENV as NodeEnv,
	port: Number(process.env.PORT),
};

export default config;
