const { signup } = require('./signup');
const { login } = require('./login');
const { current } = require('./current');
const { updateUser } = require('./updateUser');
const { logout } = require('./logout');

module.exports = {
    signup,
    login,
    current,
    updateUser,
    logout
}