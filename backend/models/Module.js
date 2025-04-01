const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Machine Learning"
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Links to a degree
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true } // Reference to the faculty member
});

module.exports = mongoose.model("Module", ModuleSchema);
