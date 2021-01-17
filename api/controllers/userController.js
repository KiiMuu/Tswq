import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import userToken from '../utils/token.js';

const signInUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: userToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const signUpUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('This email already in use');
    }

    // create => is basically syntactic sugar for the save method
    const newUser = await User.create({
        name,
        email,
        password
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: userToken(newUser._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const getUserProfile = asyncHandler(async (req, res, next) => {
    // req.user._id => whatever the current logged in user is
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
    // req.user._id => whatever the current logged in user is
    const user = await User.findById(req.user._id);

    const { name, email, password } = req.body;

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            user.password = password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: userToken(updatedUser._id)
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { 
    signInUser, 
    signUpUser, 
    getUserProfile,
    updateUserProfile
}