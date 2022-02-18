const User = require('../models/User');
const { verifyToken } = require('../helpers/jwt');

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    const validatedUser = await User.findOne({ email: payload.email });

    if (!validatedUser) throw { name: 'UNAUTHORIZED' };

    req.currentUser = {
      _id: validatedUser._id,
      email: validatedUser.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};
