const messageController = require('../controllers/messageController')

module.exports = function(app) {
    app.route('/messages/:convID').get(messageController.getAll);
    app.route('/messages').post(messageController.createMsg);
    app.route('/messages/:id').delete(messageController.deleteMsg);
    app.route('/messages/:id').put(messageController.update);
}

