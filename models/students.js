const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("Students", studentSchema);
