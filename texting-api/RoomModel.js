const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  room: {
    type: String,
    required: [true, 'Room name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;
