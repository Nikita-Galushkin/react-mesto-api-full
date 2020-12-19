const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  if (!email || !password) {
    throw new UnauthorizedError({ message: 'Переданы некорректные данные' });
  }
    User.findOne({ email })
      .then((user) => {
        if (user){
          throw new ConflictError({ message: 'Пользователь уже существует' });
        }
        bcrypt.hash(password, 10)
          .then((hash) => {
            return User.create({ name, about, avatar, email, password: hash })
              .then((user) => {
                res.send({
                  name: user.name, about: user.about, avatar: user.avatar, _id: user._id, email: user.email,
                });
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      throw new NotFoundError({ message: 'Нет пользователя с таким id' });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      throw new NotFoundError({ message: 'Нет пользователя с таким id' });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    const userId = mongoose.Types.ObjectId(req.params._id);
    User.findById(userId)
      .then((user) => {
        if (!user) {
          throw new NotFoundError({ message: 'Нет пользователя с таким id' });
        }
        return res.send(user);
      })
      .catch(next);
  } else {
    throw new BadRequestError({ message: 'Переданы некорректные данные' });
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
      // res
      //   .cookie('jwt', token, {
      //     maxAge: 3600000 * 24 * 7,
      //     httpOnly: true,
      //     sameSite: true,
      //   })
      //   .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};