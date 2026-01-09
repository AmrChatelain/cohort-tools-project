const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortSchema = new Schema({
  cohortSlug: { type: String, required: true },
  cohortName: { type: String, required: true },
  program: { type: String, required: false },
  format: { type: String, required: false },
  campus: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  inProgress: { type: Boolean, required: false },
  programManager: { type: String, required: true },
  leadTeacher: { type: String, required: true },
  totalHours: { type: Number, required: false }
});

const Cohort = mongoose.model('Cohort', cohortSchema);

module.exports = Cohort;