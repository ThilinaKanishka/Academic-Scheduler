import API from "./axiosConfig";

export const getModules = async () => {
  try {
    const response = await API.get("/modules");
    return response.data;
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw error;
  }
};

export const addModule = async (module) => {
  try {
    const response = await API.post("/modules", module); // Send module data to backend
    return response.data;
  } catch (error) {
    console.error("Error adding module:", error);
    throw error;
  }
};

export const updateModule = async (id, moduleData) => {
  try {
    const response = await API.put(`/modules/${id}`, moduleData);
    return response.data;
  } catch (error) {
    console.error("Error updating module:", error);
    throw error;
  }
};

export const deleteModule = async (id) => {
  try {
    await API.delete(`/modules/${id}`);
  } catch (error) {
    console.error("Error deleting module:", error);
    throw error;
  }
};


