module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let status = 500;
  let message = 'internal server error';

  switch (err.name) {
  case 'ValidationError':
    status = 400;
    message = Object.keys(err.errors).reduce(
      (errors, key) => ((errors[key] = err.errors[key].message), errors),
      {}
    );
    break;
  case 'JsonWebTokenError':
  case 'UNAUTHORIZED':
    status = 401;
    message = 'invalid token';
    break;
  case 'INVALID_EMAIL_PASSWORD':
    status = 401;
    message = 'invalid email/password';
    break;
  case 'NOT_FOUND':
    status = 404;
    message = 'data not found';
    break;
  case 'FORBIDDEN':
    status = 403;
    message = 'you are not authorized';
    break;
  default:
    console.log(err);
  }

  res.status(status).json({ message });
};
