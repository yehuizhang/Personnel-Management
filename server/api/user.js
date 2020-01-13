const express = require('express');

const getUserList = require('./user/getUserList');
const getUserById = require('./user/getUserById');
const addUser = require('./user/addUser');
const editUser = require('./user/editUser');
const deleteUser = require('./user/deleteUser');

const router = express.Router();

// @route POST api/user/all
// @desc All users from db
// @access Public
router.post('/all', (req, res) => {
  return getUserList(req.body, res);
});

// @route GET api/user/:id
// @desc Get the user info by id
// @access Public
router.get('/:id', (req, res) => {
  const { id } = req.params;
  return getUserById(id, res);
});

// @route POST api/user
// @desc Create a new user
// @access Public
router.post('/', (req, res) => {
  const { user } = req.body;
  return addUser(user, res);
});

// @route PUT api/user
// @desc Update user
// @access Public
router.put('/', (req, res) => {
  const { user } = req.body;
  return editUser(user, res);
});

// @route DELETE api/user/:id
// @desc Delete user by id
// @access Public
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  return deleteUser(id, res);
});

module.exports = router;
