import mongoose from "mongoose";
import validator from "validator";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide name"],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 6,
        select: false,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "last Name",
    },
    location: {
        type: String,
        trim: true,
        default: "my-city",
    },
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hashSync(this.password, salt);
});

userSchema.methods.createJwt = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFE_TIME,
    });
};

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bycrypt.compare(candidatePassword, this.password);
    return isMatch;
};

export default mongoose.model("users", userSchema);
