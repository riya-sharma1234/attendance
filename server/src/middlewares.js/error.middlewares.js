const error = (err, req, res, next) => {
    console.log("error middleware called", err); 

    err.message = err.message || "Internal Server Error";
    err.statusCode = 401;

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errObject: err,
    })
}

export default error