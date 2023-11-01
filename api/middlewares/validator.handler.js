const boom = require("@hapi/boom");

function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property];
    //abortEarly: true ==> hace que solo mande el primer error que vea, pero en "false", manda todos los errores que encuentre.
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
};

module.exports = validatorHandler;
