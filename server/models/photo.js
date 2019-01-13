const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PhotoSchema = new Schema({
	image: {type: String, required: true},
  title: {type: String, required: true},
  format: {type: String, required: true},
  date: {type: Date, required: false},
  time: {type: String, required: false},
  location: {type: Schema.Types.Mixed, required: false}
});

module.exports = mongoose.model('Photo', PhotoSchema);