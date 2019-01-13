const Photo = require('../models/photo');

module.exports = {
  create(req, res) {
  	let photo = new Photo(req.body);

    photo.save(function (err, savedPhoto) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(savedPhoto);
    });
  },
  list(req, res) {
    Photo.find({}, null, {sort: {date: -1}}, function (error, photos) {
      if (error) {
        return res.status(500).send(error);
      }
      res.json(photos);
    });
  },
  retrieve (req, res) {
    Photo.findById(req.params.photo_id, function (err, photo) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(photo);
    });
  },
  update (req, res) {
  	Photo.findByIdAndUpdate(req.params.photo_id, {$set: req.body}, function (err, photo) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(photo);
    });
  },
  delete (req, res) {
  	Photo.findByIdAndRemove(req.params.photo_id, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send('Deleted successfully!');
    })
  }
};