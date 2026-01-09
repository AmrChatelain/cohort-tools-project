const express = require("express");
const router = express.Router();
const Cohort = require("../models/cohorts.model");

// POST /api/cohorts - Creates a new cohort
router.post("/", async (req, res) => {
  try {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json(newCohort);
  } catch (error) {
    res.status(400).json({ message: "Error creating cohort", error: error.message });
  }
});

// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
router.get("/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const cohort = await Cohort.findById(cohortId);
    
    if (cohort) {
      res.json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cohort", error: error.message });
  }
});

// GET /api/cohorts - Retrieves all cohorts
router.get("/", async (req, res) => {
  try {
    const allCohorts = await Cohort.find();
    res.json(allCohorts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cohorts", error: error.message });
  }
});

// PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put("/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const updatedCohort = await Cohort.findByIdAndUpdate(
      cohortId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (updatedCohort) {
      res.json(updatedCohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating cohort", error: error.message });
  }
});

// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete("/:cohortId", async (req, res) => {
  try {
    const { cohortId } = req.params;
    const deletedCohort = await Cohort.findByIdAndDelete(cohortId);
    
    if (deletedCohort) {
      res.json({ message: "Cohort deleted successfully" });
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting cohort", error: error.message });
  }
});

module.exports = router;