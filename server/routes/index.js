module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Startflow API!',
  }));
  require('./photo_routes')(app);
};