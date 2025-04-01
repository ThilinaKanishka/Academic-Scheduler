const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true, min: 1 },
  classroomType: { type: String, required: true, enum: ["Lab", "Lecture Hall"] },
  hasProjector: { type: Boolean, required: true }
});

module.exports = mongoose.model("Classroom", ClassroomSchema);
