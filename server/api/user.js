const express = require('express');

const User = require('../models/users');

const router = express.Router();

// @route GET api/user
// @desc All users from db
// @access Public
router.get('/', async (req, res) => {
  const { sort, direction, page, per_page: perPage } = req.query;
  return res.json({ sort, direction, page, perPage });
});

// @route GET api/user/rank/:level
// @desc Get all user’s id, name and rank who has higher rank than the level
// @access Public

// @route GET api/user/:id
// @desc Get the user info by id
// @access Public

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
