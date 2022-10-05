const reservationsHandler = require('../controllers/ReservationController');

module.exports = function (app) {
    app.route('/reservation')
    .get(reservationsHandler.getReservation)
    .post(reservationsHandler.addReservation)
    app.route('/reservation/:id')
    .put(reservationsHandler.editReservation)
}