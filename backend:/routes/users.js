const router = require('express').Router();
const { validateId, validateUserUpdate, validateAvatar } = require('../middlewares/requestValidation');
const {
  getUsers, getUser, getUserMe, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:_id', getUser);
router.get('/users/me', getUserMe);
router.patch('/users/me', validateUserUpdate, updateUser);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
