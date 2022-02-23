const User = require('../models/User');
const { compareHash } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');

const PROFILE_IMAGES = [
  'https://firebasestorage.googleapis.com/v0/b/hacktiv8-instafood.appspot.com/o/avatar-1.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/hacktiv8-instafood.appspot.com/o/avatar-2.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/hacktiv8-instafood.appspot.com/o/avatar-3.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/hacktiv8-instafood.appspot.com/o/avatar-4.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/hacktiv8-instafood.appspot.com/o/avatar-5.jpg?alt=media',
  'https://firebasestorage.googleapis.com/v0/b/hacktiv8-instafood.appspot.com/o/avatar-6.jpg?alt=media',
  'https://i.pinimg.com/736x/71/b4/e8/71b4e8558fe461d0bc1b1714c748b3a0.jpg',
  'https://i.pinimg.com/736x/a9/63/c5/a963c5645cf2936bee8e475788f27289.jpg',
  'https://i.pinimg.com/originals/cc/62/2c/cc622ca2a9fcf9105ad58691e1c372d7.jpg',
  'https://i.pinimg.com/originals/d3/1e/cd/d31ecdf46c116173d4ad7cfd3d825bbd.jpg',
  'https://i.pinimg.com/originals/d1/57/c4/d157c407586f1bafdbb840967af9dfc0.jpg',
  'https://i.pinimg.com/736x/88/69/fc/8869fc8e844ea54bdbe02282910109ef.jpg'
];

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

      res.status(200).json({
        id: user.id,
        access_token: token,
      });
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
        image_url: PROFILE_IMAGES[Math.floor(Math.random() * 12)]
      });

      await user.save();

      const payload = {
        id: user.id,
        name: user.username,
        email: user.email,
      };

      const accessToken = createToken(payload);

      res.status(201).json({
        id: user.id,
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
