import CustomApiError from "./custom-api-error.js";

class NotFoundError extends CustomApiError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

export default NotFoundError;
