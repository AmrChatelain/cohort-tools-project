const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  linkedinUrl: { type: String, required: false },
  languages: {
    type: [String],
    enum: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Dutch",
      "Other",
    ],
  },
  program: { type: String, required: false },
  background: { type: String, default: "" },
  image: { type: String, default: `https://i.imgur.com/r8bo8u7.png` },
  cohort: { type: Schema.Types.ObjectId, required: false },
  projects: { type: [Schema.Types.ObjectId], required: false },
});

const Student=mongoose.model('Student',studentSchema);

module.exports =Student;