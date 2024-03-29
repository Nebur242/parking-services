class ApiError extends Error {
	statusCode: number;
	isOperational: Boolean;
	constructor(
		statusCode: number,
		message: string,
		isOperational: Boolean = true,
		stack: string = ''
	) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export { ApiError };
