const express = require("express");
const router = express.Router();
const Student = require("../models/students.model");

// POST /api/students - Creates a new student
router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error); 
  }
});

// GET /api/students/cohort/:cohortId
router.get("/cohort/:cohortId", async (req, res, next) => {
  try {
    const { cohortId } = req.params;
    const cohortStudents = await Student.find({ cohort: cohortId }).populate("cohort");
    res.json(cohortStudents);
  } catch (error) {
    next(error);  
  }
});

// GET /api/students/:studentId
router.get("/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("cohort");
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.json(student);
  } catch (error) {
    next(error); 
  }
});

// GET /api/students
router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.find().populate("cohort");
    res.json(allStudents);
  } catch (error) {
    next(error);  
  }
});

// PUT /api/students/:studentId
router.put("/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.json(updatedStudent);
  } catch (error) {
    next(error); 
  }
});

// DELETE /api/students/:studentId
router.delete("/:studentId", async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    next(error); 
  }
});

module.exports = router;