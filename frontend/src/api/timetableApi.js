import API from "./axiosConfig";

export const generateTimetable = async (title, entries) => {
  try {
    const response = await API.post("/timetable/generate", { title, entries });
    return response.data;
  } catch (error) {
    console.error("Error generating timetable:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchTimetableByName = async (name) => {
  try {
    const response = await API.get(`/timetable/${name}`);
    return response.data.timetable;
  } catch (error) {
    console.error("Error fetching timetable:", error);
    throw error;
  }
};
