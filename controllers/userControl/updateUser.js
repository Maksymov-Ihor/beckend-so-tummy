const { User } = require('../../models/userSchema.js');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const {
    ctrlWrapper,
    HttpError
} = require('../../helpers');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatar');

const updateUser = async (req, res) => {
    if (!req.body) {
        throw HttpError(401, 'Not autorized');
    }

    const { name, email } = req.body;
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const fileName = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarDir, fileName);
    await fs.rename(tempUpload, resultUpload);

    const resizeImage = await Jimp.read(resultUpload);
    resizeImage.resize(250, 250).write(resultUpload);
    const avatarURL = path.join('avatar', fileName);

    await User.findByIdAndUpdate(_id, { name, email, avatarURL }, { new: true });

    res.status(200).json({
        user: {
            name,
            email,
            avatarURL,
        }
    })
}

module.exports = {
    updateUser: ctrlWrapper(updateUser)
}