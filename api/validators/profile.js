import { check } from 'express-validator';

const profileValidator = [
    check('name')
    .optional()
    .not()
    .isEmpty()
    .withMessage('Please provide a name')
    .isLength({ min: 2 })
    .withMessage('At least 2 characters for name'),
    check('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),
    check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('At least 6 characters for password')
];

export { profileValidator }