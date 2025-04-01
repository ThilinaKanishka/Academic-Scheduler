import { useEffect, useState } from "react";
import { getModules, addModule, updateModule, deleteModule } from "../api/moduleApi";
import { getFaculty } from "../api/facultyApi";
import { getCourses } from "../api/courseApi";

const Modules = () => {
  const [modules, setModules] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newModule, setNewModule] = useState({
    title: "",
    description: "",
    course: "",
    faculty: "",
  });
  const [editModule, setEditModule] = useState(null);

  useEffect(() => {
    fetchModules();
    fetchFaculty();
    fetchCourses();
  }, []);

  const fetchModules = async () => {
    try {
      const data = await getModules();
      setModules(data);
    } catch (error) {
      console.error("Error loading modules:", error);
    }
  };

  const fetchFaculty = async () => {
    try {
      const data = await getFaculty();
      setFaculty(data);
    } catch (error) {
      console.error("Error loading faculty:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editModule) {
      setEditModule({ ...editModule, [name]: value });
    } else {
      setNewModule({ ...newModule, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editModule) {
        await updateModule(editModule._id, editModule);
        setEditModule(null);
      } else {
        await addModule(newModule);
        setNewModule({ title: "", description: "", course: "", faculty: "" });
      }
      fetchModules();
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };

  const handleEditClick = (module) => {
    setEditModule({
      ...module,
      course: module.course?._id || "", 
      faculty: module.faculty?._id || ""
    });
  };
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        await deleteModule(id);
        fetchModules();
      } catch (error) {
        console.error("Error deleting module:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Modules</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={editModule ? editModule.title : newModule.title} onChange={handleInputChange} placeholder="Module Title" className="w-full p-3 border rounded-lg" />
        <textarea name="description" value={editModule ? editModule.description : newModule.description} onChange={handleInputChange} placeholder="Module Description" className="w-full p-3 border rounded-lg" />
        <select name="course" value={editModule ? editModule.course : newModule.course} onChange={handleInputChange} className="w-full p-3 border rounded-lg">
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>{course.name}</option>
          ))}
        </select>
        <select name="faculty" value={editModule ? editModule.faculty : newModule.faculty} onChange={handleInputChange} className="w-full p-3 border rounded-lg">
          <option value="">Select Faculty</option>
          {faculty.map((member) => (
            <option key={member._id} value={member._id}>{member.name}</option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">{editModule ? "Update Module" : "Create Module"}</button>
      </form>
      <h3 className="text-xl font-semibold mt-8 mb-4">Existing Modules</h3>
      <div className="space-y-4">
        {modules.map((mod) => (
          <div key={mod._id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">{mod.title}</h3>
            <p className="text-gray-600">{mod.description}</p>
            <p><strong>Course:</strong> {mod.course?.name || "No course assigned"}</p>
            <p><strong>Faculty:</strong> {mod.faculty?.name || "No faculty assigned"}</p>
            <button onClick={() => handleEditClick(mod)} className="bg-yellow-500 text-white p-2 rounded-lg mr-2">Edit</button>
            <button onClick={() => handleDelete(mod._id)} className="bg-red-500 text-white p-2 rounded-lg">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modules;