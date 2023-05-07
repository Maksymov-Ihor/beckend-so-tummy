const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const { User } = require('../../models/userSchema');

const {
    ctrlWrapper,
    HttpError
} = require('../../helpers');

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
        throw HttpError(409, `User with ${email} already exist`);
    }

    const avatarURL = gravatar.url(email);

    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = new User({ name, email, password: hashPass });

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

    const newUser = await User.create({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token,
        avatarURL
    });

    res.status(201).json({
        status: 'success',
        token,
        user: {
            name: newUser.name,
            email: newUser.email,
            avatarURL: newUser.avatarURL
        }
    })
}

module.exports = {
    signup: ctrlWrapper(signup)
};