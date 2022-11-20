import { IUser, IUserDoc } from '../../../modules/users/models/user.model';
import { TokenTypes } from '../../../config/tokens';
import mongoose from 'mongoose';

export interface IToken {
	token: string;
	user: IUserDoc;
	type: TokenTypes;
	expires: Date;
	blacklisted?: boolean;
}

const TokenSchema = new mongoose.Schema<IToken>(
	{
		token: {
			type: String,
			required: true,
			index: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		expires: {
			type: Date,
			required: true,
		},
		blacklisted: {
			type: Boolean,
			required: false,
			default: false,
		},
		type: {
			type: String,
			enum: TokenTypes,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Token = mongoose.model('Token', TokenSchema);

export { Token };
