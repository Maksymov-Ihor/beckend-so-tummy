const { ctrlWrapper } = require('../../helpers');

const current = async (req, res) => {
    const { name, email } = req.user;
    res.status(200).json({
        user: {
            name,
            email,
        }
    })
}

module.exports = {
    current: ctrlWrapper(current)
}