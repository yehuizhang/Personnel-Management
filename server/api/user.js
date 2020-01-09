const express = require('express');
const { upload } = require('../middleware/multer');

const {
  getUserList,
  getUserById,
  getOfficers,
  addUser,
  updateUser,
  deleteUser,
  getAvatar,
} = require('./utils/userUtils');

const router = express.Router();

// @route GET api/user/all
// @desc All users from db
// @access Public
router.get('/all', (req, res) => {
  const { sort, direction, page, keyword } = req.query;
  return getUserList(sort, direction, page, keyword, res);
});

// @route GET api/user/officers
// @desc Get users who has rank higher than 0.
// @access Public
router.get('/officers', (req, res) => {
  return getOfficers(res);
});

// @route GET api/user/avatar/:id
// @desc Get user's avatar
// @access Public
router.get('/avatar/:id', (req, res) => {
  const { id } = req.params;
  return getAvatar(id, res);
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
  const user = req.body;
  return addUser(user, res);
});

// @route PUT api/user
// @desc Update user
// @access Public
router.put('/', (req, res) => {
  const user = req.body;
  return updateUser(user, res);
});

router.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    return res.json({
      imageUrl: `images/uploads/${req.file.filename}`,
    });
  }
  return res.status('409').json({ message: 'No Files to Upload.' });
});

// @route DELETE api/user/:id
// @desc Delete user by id
// @access Public
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  return deleteUser(id, res);
});

module.exports = router;
