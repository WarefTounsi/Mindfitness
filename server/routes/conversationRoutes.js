const conversationController = require('../controllers/conversationController');
const auth = require('../middleware/auth');

module.exports = function(app) {
    app.use(auth.protect)
    app.route('/conversations/with/:id').get(conversationController.getOneWithUser);
    app.route('/conversations').get(conversationController.getAll);
}