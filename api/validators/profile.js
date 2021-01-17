import { check } from 'express-validator';

const profileValidator = [
    check('name')
    .optional({ checkFalsy: true })
    .not()
    .isEmpty()
    .withMessage('Please provide a name')
    .isLength({ min: 2 })
    .withMessage('At least 2 characters for name'),
    check('email')
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email'),
    check('password')
    .optional({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('At least 6 characters for password')
];

export { profileValidator }