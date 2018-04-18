module.exports = function(app){
    var airPlane = require('../controllers/airController');

    // airPlane routes
    app.route('/api/airPlane')
        .get(airPlane.listAllLink)
        .post(airPlane.createLink);

    app.route('/api/airPlane/:id')
        .get(airPlane.getOne)
        .put(airPlane.updateLink)
        .delete(airPlane.deleteLink);
};
