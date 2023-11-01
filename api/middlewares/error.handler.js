//Es importante el orden en que se coloquen porque es el orden en que se ejecutarán. En este caso el logErrors es el único con un next, por lo tanto, si se colocará el errorHandler antes, ahí terminaría el proceso.

function logErrors (err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
};

function errorHandler (err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
};

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

module.exports = { logErrors, errorHandler, boomErrorHandler };
