const contactHandler = require('../controllers/contactController');

module.exports = function (app) {
    app.route('/contact').get(contactHandler.getAllMessages);
    app.route('/contact').post(contactHandler.createMessage);
}