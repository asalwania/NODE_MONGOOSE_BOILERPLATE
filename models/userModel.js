const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please tell us your name!"],
    },
    email: {
        type: String,
        require: [true, "Please tell us your email!"],
        unique: true,
        lowercase: true, // transform email to lowercase
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: String,
    password: {
        type: String,
        require: [true, "Please provide a password"],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        require: [true, "Please confirm your password"],
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
