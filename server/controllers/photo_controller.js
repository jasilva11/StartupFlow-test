const Photo = require('../models/photo');

module.exports = {
  create(req, res, next) {
  	let photo = new Photo(req.body);

    photo.save(function (err, savedPhoto) {
      if (err) {
        return next(err);
      }
      res.send(savedPhoto);
    });
  },
  list(req, res, next) {
    Photo.find({}, null, {sort: {date: -1}}, function (error, photos) {
      if (error) {
        return next(error);
      }
      res.json(photos);
    });
  },
  retrieve (req, res, next) {
    Photo.findById(req.params.photo_id, function (err, photo) {
      if (err) {
        return next(err);
      }
      res.send(photo);
    });
  },
  previousPhoto (req, res, next) {
    Photo.findById(req.params.photo_id, function (err, photo) {
      if (err) {
        return next(err);
      }
      Photo.find({date: {$gt: photo.date}}, null, {sort: {date: 1}}).limit(1).exec(function (err, photos) {
        if(!photos || photos.length == 0) res.send({error: 'Not found'});
        else res.send(photos[0]);
      });
    });
  },
  nextPhoto (req, res, next) {
    Photo.findById(req.params.photo_id, function (err, photo) {
      if (err) {
        return next(err);
      }
      Photo.find({date: {$lt: photo.date}}, null, {sort: {date: -1}}).limit(1).exec(function (errNext, photos) {
        if(!photos || photos.length == 0) res.send({error: 'Not found'});
        else res.send(photos[0]);
      });
    });
  },
  update (req, res, next) {
  	Photo.findByIdAndUpdate(req.params.photo_id, {$set: req.body}, function (err, photo) {
      if (err) {
        return next(err);
      }
      res.send(photo);
    });
  },
  delete (req, res, next) {
  	Photo.findByIdAndRemove(req.params.photo_id, function (err) {
      if (err) {
        return next(err);
      }
      res.send('Deleted successfully!');
    })
  }
};