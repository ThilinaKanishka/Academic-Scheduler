const express = require("express");
const router = express.Router();
const { getAllModules, createModule, updateModule, deleteModule } = require("../controllers/moduleController");

router.get("/", getAllModules);
router.post("/", createModule);
router.put("/:id", updateModule); // Update module
router.delete("/:id", deleteModule); // Delete module

module.exports = router;
