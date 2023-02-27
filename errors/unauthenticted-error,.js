import CustomApiError from "./custom-api-error.js";

class UnauthenticatedError extends CustomApiError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

export default UnauthenticatedError;
