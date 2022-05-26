const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: "sucess",
        results: 1,
        data: users,
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    //
});

exports.createUser = (req, res) => {
    //
};

exports.updateUser = (req, res) => {
    //
};

exports.deleteUser = (req, res) => {
    //
};
