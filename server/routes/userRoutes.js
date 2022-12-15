const userHandler = require('../controllers/userController')
const authHandler = require('../controllers/account/lib')

module.exports = function(app) {
    app.route('/user/login').post(authHandler.signIn)
    app.route('/user/register').post(authHandler.signUp);
    app.route('/user').get(userHandler.getAllUsers);
    app.route('/user/:id').delete(userHandler.deleteUser);
    app.route('/user/:id').put(userHandler.updateUser);
}