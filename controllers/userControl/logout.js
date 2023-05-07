const { User } = require('../../models/userSchema');

const { ctrlWrapper } = require('../../helpers');

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(200).json();
}

module.exports = {
    logout: ctrlWrapper(logout)
}