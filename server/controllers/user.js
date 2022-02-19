const User = require('../models/User');
const { compareHash } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

class Controller {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email }).select([
        'email',
        'password',
      ]);

      if (!user || !compareHash(password, user.password)) {
        throw { name: 'INVALID_EMAIL_PASSWORD' };
      }

      const payload = {
        id: user.id,
        name: user.username,
        email: user.email,
      };
      const token = createToken(payload);

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const user = new User({
        username: username,
        email: email,
        password: password,
      });

      await user.save();

      const payload = {
        id: user.id,
        name: user.username,
        email: user.email,
      };

      const accessToken = createToken(payload);

      res.status(201).json({
        access_token: accessToken,
      });
    } catch (err) {
      next(err);
    }
  }

  static async listUsers(req, res, next) {
    try {
      const filter = {};

      if (req.query.username) {
        filter.username = {
          $regex: req.query.username,
        };
      }

      let users = await User.find(filter, {
        email: 0,
        __v: 0,
      });

      users = users.map(v => {
        v = v.toObject();
        v.id = v._id;
        delete v._id;

        return v;
      });

      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  static async findUserById(req, res, next) {
    try {
      const { id } = req.params;

      let user = await User.findOne({ _id: id }, { password: 0, __v: 0 });

      if (!user) throw { name: 'NOT_FOUND' };

      user = user.toObject();
      user.id = user._id;
      delete user._id;

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
