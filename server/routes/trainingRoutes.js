const trainingHandler = require('../controllers/trainingController');

module.exports = function(app) {
    app.route('/training/:id')
      .get(trainingHandler.getTrainingById)
      .put(trainingHandler.editTrainingById)
      .delete(trainingHandler.deleteTraining)
    app.route('/training')
      .post(trainingHandler.createTraining)
    app.route('/training')
      .get(trainingHandler.getTrainings)
    app.route('/training/:id/is-mine')
      .post(trainingHandler.isMine)    
};