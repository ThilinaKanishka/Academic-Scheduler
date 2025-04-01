const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");

// Import Routes
const facultyRoutes = require("./routes/facultyRoutes");
const courseRoutes = require("./routes/courseRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const classroomRoutes = require("./routes/classroomRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const examScheduleRoutes = require("./routes/examScheduleRoutes"); // ✅ Added exam schedule routes
const timetableRoutes = require("./routes/timetableRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/faculty", facultyRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/classrooms", classroomRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/exams", examScheduleRoutes); // ✅ Added exam schedule API
app.use("/api/timetable", timetableRoutes);
app.use("/api/auth", authRoutes);


// Basic route
app.get("/", (req, res) => {
  res.send("Academic Scheduler Backend is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
