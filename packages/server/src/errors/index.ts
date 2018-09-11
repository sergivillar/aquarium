class APIError extends Error {
    code: number;

    constructor(message: string, code?: number) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = message;
        this.code = code || 500;
    }
}

export default APIError;
