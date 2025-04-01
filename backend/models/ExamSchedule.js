const mongoose = require("mongoose");

const ExamScheduleSchema = new mongoose.Schema({
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true }, // Exam for which module
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true }, // Invigilator
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true }, // Where the exam happens
  examDate: { type: Date, required: true } // Date and time of the exam
});

// Prevent exam scheduling conflicts (same classroom at the same time)
ExamScheduleSchema.pre("save", async function (next) {
  const existingExam = await mongoose.model("ExamSchedule").findOne({
    classroom: this.classroom,
    examDate: this.examDate
  });

  if (existingExam) {
    const error = new Error("Exam scheduling conflict detected! Classroom already booked.");
    return next(error);
  }

  next();
});

module.exports = mongoose.model("ExamSchedule", ExamScheduleSchema);
