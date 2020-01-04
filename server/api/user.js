const express = require('express');
const {
  getUserList,
  getUserById,
  getUsersWithHigherRank,
} = require('./utils/userUtils');

const router = express.Router();

// @route GET api/user
// @desc All users from db
// @access Public
router.get('/', async (req, res) => {
  const { sort, direction, page } = req.query;
  return getUserList(sort, direction, page, res);
});

// @route GET api/user/:id
// @desc Get the user info by id
// @access Public
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  return getUserById(id, res);
});

// @route GET api/user/rank/:level
// @desc Get all user’s id, name and rank who has higher rank than the level
// @access Public
router.get('/rank/:level', async (req, res) => {
  const { level } = req.params;
  return getUsersWithHigherRank(level, res);
});

// @route POST api/user
// @desc Create a new user
// @access Public

// @route PUT api/user/:id
// @desc Update user by id
// @access Public

// @route DELETE api/user/:id
// @desc Delete user by id
// @access Public

module.exports = router;
