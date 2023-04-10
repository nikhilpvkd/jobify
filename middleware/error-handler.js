export const errorHandler = (err, req, res, next) => {
    const defaultError = {
        statusCode: err.statusCode || 500,
        message: err.message || "Something went wrong Please try again latter!",
    };

    //handling required field error
    if (err.name === "ValidationError") {
        defaultError.statusCode = 400;
        defaultError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
    }

    // hndling unique error
    if (err.code === 11000) {
        defaultError.statusCode = 400;
        defaultError.message = `${Object.keys(err.keyValue)} already exist`;
    }

    res.status(defaultError.statusCode).json({
        status: "failed",
        message: defaultError.message,
        data: null,
    });
};
