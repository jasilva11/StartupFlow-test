const photo_controller = require('../controllers/photo_controller');

module.exports = (app) => {
    app.get('/api/photo', photo_controller.list);
    app.get('/api/photo/:photo_id', photo_controller.retrieve);
    app.put('/api/photo/:photo_id', photo_controller.update);
    app.post('/api/photo', photo_controller.create);
    app.delete('/api/photo/:photo_id', photo_controller.delete);
};