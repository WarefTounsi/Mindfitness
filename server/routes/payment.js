const { Add, Verify } = require("../controllers/payment") 

module.exports = function (app) {
    app.route('/payment').get(Add)
    app.route('/payment/:id').get(Verify)
}

