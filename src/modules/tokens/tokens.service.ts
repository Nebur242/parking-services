import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import { TokenTypes } from '../../config/tokens';
import config from '../../config/config';
import { IUser, IUserDoc } from '../users/models/user.model';
import { IToken, Token } from './models/token.model';

interface ITokenGen {
	userId: string;
	expires: Moment;
	type: TokenTypes;
	secret?: string;
}

const generateToken = ({
	userId,
	expires,
	type,
	secret = config.jwt.secret,
}: ITokenGen) => {
	const payload = {
		sub: userId,
		iat: moment().unix(),
		exp: expires.unix(),
		type,
	};
	return jwt.sign(payload, secret);
};

const saveToken = async ({
	token,
	user,
	expires,
	type,
	blacklisted = false,
}: IToken) => {
	const tokenDoc = await Token.create({
		token,
		user,
		expires,
		type,
		blacklisted,
	});
	return tokenDoc;
};

const generateAuthTokens = async (
	user: IUserDoc
): Promise<{
	access: {
		token: string;
		expires: Date;
	};
	refresh: {
		token: string;
		expires: Date;
	};
}> => {
	const accessTokenExpires = moment().add(
		config.jwt.accessExpirationMinutes,
		'days'
	);
	const accessToken = generateToken({
		userId: user._id,
		expires: accessTokenExpires,
		type: TokenTypes.ACCESS,
	});

	const refreshTokenExpires = moment().add(
		config.jwt.refreshExpirationDays,
		'days'
	);
	const refreshToken = generateToken({
		userId: user.id,
		expires: refreshTokenExpires,
		type: TokenTypes.REFRESH,
	});

	await saveToken({
		user,
		token: refreshToken,
		expires: refreshTokenExpires.toDate(),
		type: TokenTypes.REFRESH,
	});
	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires.toDate(),
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires.toDate(),
		},
	};
};

const verifyRefreshToken = async (token: string, type: TokenTypes) => {
	const payload = jwt.verify(token, config.jwt.secret);
	const tokenDoc = await Token.findOne({
		token,
		type,
		user: payload.sub,
		blacklisted: false,
	});
	if (!tokenDoc) {
		throw new Error('Token not found');
	}
	return tokenDoc;
};

const verifyToken = async (token: string) => {
	return jwt.verify(token, config.jwt.secret);
};

export default {
	generateToken,
	generateAuthTokens,
	verifyToken,
	verifyRefreshToken,
};
