const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/requestValidation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:_id', validateId, deleteCard);
router.put('/cards/:_id/likes', validateId, likeCard);
router.delete('/cards/:_id/likes', validateId, dislikeCard);

module.exports = router;
