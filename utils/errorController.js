const sendErrorDev = (err, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: 0,
        stack: err.stack,
        message: err.message
    });
};

const sendErrorprod = (err, res) => {
    const statusCode = err.statusCode || 500;
    if (err.isOperational) {
        res.status(statusCode).json({
            success: 0,
            message: err.message
        });
    } else {
        res.status(statusCode).json({
            success: 0,
            message: "Something went wrong"
        });
    }
};

module.exports = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'dev') {
        sendErrorDev(err, res);
    } else {
        sendErrorprod(err, res);
    }
};
