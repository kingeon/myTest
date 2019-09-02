export class ValidationError extends Error {
    constructor(msg) {
        super(msg)
        this.message = msg;
        this.name = "ValidationError";
    }
}

export class NotFoundError extends Error {
    constructor(msg) {
        super(msg)
        this.message = msg;
        this.name = "NotFoundError";
    }
}