const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  physics: {
    type: Number,
    required: true,
  },
  chemistry: {
    type: Number,
    required: true,
  },
  math: {
    type: Number,
    required: true,
  },
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
