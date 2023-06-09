const { Schema, moled, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    }
}, { versionKey: false, timestamps: true });

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const User = model('user', userSchema);

module.exports = {
    User,
    joiRegisterSchema,
    joiLoginSchema,
}