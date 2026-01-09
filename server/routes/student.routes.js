const express = require("express");
const router = express.Router();
const Student = require("../models/students.model");

// POST /api/students - Creates a new student
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: "Error creating student", error: error.message });
  }
});

// GET /api/students/cohort/:cohortId - Retrieves all students for a given cohort
router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const cohortStudents = await Student.find({ cohort: cohortId });
    res.json(cohortStudents);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving students", error: error.message });
  }
});

// GET /api/students/:studentId - Retrieves a specific student by id
router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("cohort");
    
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving student", error: error.message });
  }
});

// GET /api/students - Retrieves all students
router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find().populate("cohort");
    res.json(allStudents);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving students", error: error.message });
  }
});

// PUT /api/students/:studentId - Updates a specific student by id
router.put("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating student", error: error.message });
  }
});

// DELETE /api/students/:studentId - Deletes a specific student by id
router.delete("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    
    if (deletedStudent) {
      res.json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message });
  }
});

module.exports = router;