const coachHandler = require('../controllers/coachController');

module.exports = function(app) {
    app.route('/coach/:id')
      .get(coachHandler.getCoachById)
      .put(coachHandler.editCoachById)
      .delete(coachHandler.deleteCoach)

    app.route('/coach')
      .post(coachHandler.createCoach)

    app.route('/coach')
      .get(coachHandler.getAllCoachs)    
};