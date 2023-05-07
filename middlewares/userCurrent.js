const { User } = require('../models/userSchema');

const jwt = require('jsonwebtoken');

const { HttpError } = require('../helpers');

const { SECRET_KEY } = process.env;

const userCurrent = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    try {
        if (bearer !== 'Bearer') {
            throw HttpError(401, 'Not authrized');
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw HttpError(401, 'Not authrized');
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === 'Invalid sugnature') {
            throw error;
        }
    }
}

module.exports = userCurrent;