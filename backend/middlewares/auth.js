const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходимо авторизоваться!'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  const isProdEnv = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret';
  let payload;

  try {
    payload = jwt.verify(token, isProdEnv);
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться!'));
    return;
  }

  req.user = { _id: payload._id };
  next();
};
