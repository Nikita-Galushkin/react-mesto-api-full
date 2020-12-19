const router = require('express').Router();
const { validateId, validateUserUpdate, validateAvatar } = require('../middlewares/requestValidation');
const {
  getUsers, getUserMe, updateUser, updateAvatar, getUser
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserMe);
router.patch('/users/me', validateUserUpdate, updateUser);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);
router.get('/users/:_id', getUser);

module.exports = router;
