const Module = require("../models/Module");

// @desc Get all modules with faculty populated
exports.getAllModules = async (req, res) => {
  try {
    const modules = await Module.find()
      .populate("faculty", "name")  // Populate the faculty field with the faculty's name
      .populate("course", "name description");  // Optionally populate course details too

    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
// @desc Create new module
exports.createModule = async (req, res) => {
  try {
    const { title, description, course, faculty } = req.body;  // Include faculty in the request
    const module = new Module({ title, description, course, faculty }); // Add faculty reference
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ message: "Error creating module", error });
  }
};

// @desc Update a module by ID
exports.updateModule = async (req, res) => {
  try {
    const { title, description, course, faculty } = req.body;
    const updatedModule = await Module.findByIdAndUpdate(
      req.params.id,
      { title, description, course, faculty },
      { new: true, runValidators: true }
    ).populate("faculty", "name").populate("course", "name description");

    if (!updatedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json(updatedModule);
  } catch (error) {
    res.status(400).json({ message: "Error updating module", error });
  }
};


// @desc Delete a module by ID
exports.deleteModule = async (req, res) => {
  try {
    const deletedModule = await Module.findByIdAndDelete(req.params.id);

    if (!deletedModule) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting module", error });
  }
};
