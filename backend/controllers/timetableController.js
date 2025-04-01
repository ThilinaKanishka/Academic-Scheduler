const Timetable = require("../models/Timetable");

const generateTimeSlots = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM"];
  const slots = [];

  days.forEach((day) => {
    times.forEach((time) => {
      slots.push(`${day} ${time}`);
    });
  });

  return slots;
};

// Generate timetable
const generateTimetable = async (req, res) => {
  const { title, entries } = req.body;

  if (!title || !entries || entries.length < 4) {
    return res.status(400).json({ message: "Title and at least 4 entries are required." });
  }

  try {
    const timeSlots = generateTimeSlots();

    // Check if timetable with the same title exists
    const existingTimetable = await Timetable.findOne({ title });
    if (existingTimetable) {
      return res.status(400).json({ message: "A timetable with this title already exists." });
    }

    // Assign time slots
    const timetableEntries = entries.map((entry, index) => ({
      module: entry.module,
      classroom: entry.classroom,
      faculty: entry.faculty,
      timeSlot: timeSlots[index % timeSlots.length],
    }));

    // Save timetable
    const newTimetable = new Timetable({ title, entries: timetableEntries });
    await newTimetable.save();

    res.status(201).json({ message: "Timetable generated successfully", timetable: newTimetable });
  } catch (error) {
    console.error("Error generating timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all timetables
const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find().populate("entries.module", "title").populate("entries.classroom", "roomNumber").populate("entries.faculty", "name");
    res.status(200).json({ timetables });
  } catch (error) {
    console.error("Error fetching timetables:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTimetableByTitle = async (req, res) => {
  const { title } = req.params;
  console.log("Request for timetable with title:", title); // Log the title to verify
  try {
    const timetable = await Timetable.findOne({ title }).populate("entries.module", "title").populate("entries.classroom", "roomNumber").populate("entries.faculty", "name");

    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found." });
    }

    res.status(200).json({ timetable });
  } catch (error) {
    console.error("Error fetching timetable:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { generateTimetable, getTimetables, getTimetableByTitle };
