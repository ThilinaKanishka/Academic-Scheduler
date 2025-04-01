import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Courses from "../pages/Courses";
import Faculty from "../pages/Faculty";
import Modules from "../pages/Modules";
import Classrooms from "../pages/Classrooms";
import TimetableGenerator from "../pages/Timetable";
import ViewTimetable from "../pages/ViewTimetable ";
import Notifications from "../pages/Notifications";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/classrooms" element={<Classrooms />} />
          <Route path="/schedules" element={<TimetableGenerator />} />
          <Route path="/timetables" element={<ViewTimetable />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
