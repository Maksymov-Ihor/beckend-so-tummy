const jwt = require('jsonwebtoken');

const { User } = require('../../models/userSchema');

const {
    ctrlWrapper,
    HttpError
} = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        throw HttpError(401, 'Email or pasword is wrong');
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        status: 'success',
        token,
        user: {
            email,
        }
    })
}

module.exports = {
    login: ctrlWrapper(login)
}