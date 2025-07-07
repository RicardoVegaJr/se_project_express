const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
console.log(JWT_SECRET);

const authMiddleware = (req, res, next) => {

  const { authorization } = req.headers;

if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'error 1' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // trying to verify the token
    payload = jwt.verify(token, JWT_SECRET);

  } catch (err) {
    // we return an error if something goes wrong
    return res
      .status(401)
      .send({ message: 'error 2' });
  }
  req.user = payload; // assigning the payload to the request object

  next(); // sending the request to the next middleware

};



module.exports = authMiddleware;