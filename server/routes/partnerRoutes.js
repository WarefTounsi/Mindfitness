const partnerHandler = require('../controllers/partnerController');

module.exports = function(app) {
    app.route('/partner').post(partnerHandler.addPartner);
    app.route('/partner').get(partnerHandler.getAllPartners);
    app.route('/partner/:id').delete(partnerHandler.deletePartner);
}