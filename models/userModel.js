const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
        select: false,
    },
    passwordConfirm: {
        type: String,
        require: [true, "Please confirm your password"],
        validate: {
            // this will work on only Create & Save
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same",
        },
    },
    passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
    // only run this function if password is modified
    if (!this.isModified("password")) return next();

    // hash the password
    this.password = await bcrypt.hash(this.password, 12);

    // clear the password confirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        console.log(changedTimeStamp, JWTTimeStamp);
        return JWTTimeStamp < changedTimeStamp;
    }

    // If password not changed
    return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
