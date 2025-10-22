const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
    '/register',
    [
      body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string'),
      body('password')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
      body('role').optional().isIn(['user', 'admin']).withMessage('Role must be either user or admin')
    ],
    authController.register
  );
router.post('/login', authController.login);
module.exports = router;