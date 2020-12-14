const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => {
      throw new BadRequestError('Переданы некорректные данные');
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для выполнения операции');
      }
      const { cardId } = req.params;
      Card.findByIdAndRemove({ _id: cardId })
        .then((card) => {
          res.send({ data: card });
      })
      .catch(next);
    })
    .catch(() => {
      throw new NotFoundError('Нет карточки с таким id');
    });
};

module.exports.likeCard = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    const cardId = mongoose.Types.ObjectId(req.params._id);
    Card.findByIdAndUpdate({ _id: cardId },
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true })
      .then((likes) => {
        if (!likes) {
          throw new NotFoundError('Нет карточки с таким id');
        }
        return res.send(likes);
      })
      .catch(next);
  } else {
    throw new BadRequestError('Переданы некорректные данные');
  }
};

module.exports.dislikeCard = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params._id)) {
    const cardId = mongoose.Types.ObjectId(req.params._id);
    Card.findByIdAndUpdate({ _id: cardId },
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true })
      .then((likes) => {
        if (!likes) {
          throw new NotFoundError('Нет карточки с таким id');
        }
        return res.send(likes);
      })
      .catch(next);
  } else {
    throw new BadRequestError('Переданы некорректные данные');
  }
};
