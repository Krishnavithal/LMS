const mongoose = require("mongoose");
const classRoomsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("ClassRooms", classRoomsSchema);
