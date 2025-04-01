const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // Unique timetable name
  entries: [
    {
      module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
      classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
      faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
      timeSlot: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Timetable", TimetableSchema);
