const express = require("express");
const router = express.Router();
const { generateTimetable, getTimetables, getTimetableByTitle } = require("../controllers/timetableController");

router.post("/generate", generateTimetable);
router.get("/", getTimetables);
router.get("/:title", getTimetableByTitle); // Ensure this route exists

module.exports = router;
