const ExamSchedule = require("../models/ExamSchedule");

// @desc Get all exam schedules
exports.getAllExams = async (req, res) => {
  try {
    const exams = await ExamSchedule.find()
      .populate("faculty", "name email department")
      .populate("module", "title description")
      .populate("classroom", "roomNumber capacity");

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Create a new exam schedule
exports.createExam = async (req, res) => {
  try {
    const { module, faculty, classroom, examDate } = req.body;

    // Check for faculty availability
    const facultyConflict = await ExamSchedule.findOne({
      faculty,
      examDate
    });

    if (facultyConflict) {
      return res.status(400).json({ message: "Faculty is already assigned to another exam at this time." });
    }

    // Check for classroom availability
    const classroomConflict = await ExamSchedule.findOne({
      classroom,
      examDate
    });

    if (classroomConflict) {
      return res.status(400).json({ message: "Classroom is already booked for another exam at this time." });
    }

    const exam = new ExamSchedule({ module, faculty, classroom, examDate });
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ message: "Error scheduling exam", error });
  }
};

// @desc Delete an exam schedule
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    await ExamSchedule.findByIdAndDelete(id);
    res.status(200).json({ message: "Exam schedule deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting exam schedule", error });
  }
};
