const express = require('express');
const {
  getUserList,
  getUserById,
  getUsersWithHigherRank,
  addUser,
  updateUser,
  deleteUser,
} = require('./utils/userUtils');

const router = express.Router();

// @route GET api/user
// @desc All users from db
// @access Public
router.get('/', (req, res) => {
  const { sort, direction, page, keyword } = req.query;
  return getUserList(sort, direction, page, keyword, res);
});

// @route GET api/user/:id
// @desc Get the user info by id
// @access Public
router.get('/:id', (req, res) => {
  const { id } = req.params;
  return getUserById(id, res);
});

// @route GET api/user/rank/:level
// @desc Get all user’s id, name and rank who has higher rank than the level
// @access Public
router.get('/rank/:level', (req, res) => {
  const { level } = req.params;
  return getUsersWithHigherRank(level, res);
});

// @route POST api/user
// @desc Create a new user
// @access Public
router.post('/', (req, res) => {
  const { user } = req.body;
  return addUser(user, res);
});

// @route PUT api/user/
// @desc Update user
// @access Public
router.put('/', (req, res) => {
  const { user } = req.body;
  return updateUser(user, res);
});

// @route DELETE api/user/:id
// @desc Delete user by id
// @access Public
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  return deleteUser(id, res);
});

module.exports = router;
