import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../modules/users/models/user.model';
import config from './config';
import { TokenTypes } from './tokens';

const jwtOptions = {
	secretOrKey: config.jwt.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done: Function) => {
	try {
		if (payload.type !== TokenTypes.ACCESS) {
			throw new Error('Invalid token type');
		}
		const user = await User.findById(payload.sub);
		if (!user) {
			return done(null, false);
		}
		done(null, user);
	} catch (error) {
		done(error, false);
	}
};

const jwtStrategy = new Strategy(jwtOptions, jwtVerify);

export { jwtStrategy };
