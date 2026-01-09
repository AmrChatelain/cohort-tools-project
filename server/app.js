const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;
const mongoose = require("mongoose");

// INITIALIZE EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
// GET /docs - Return HTML documentation
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// Import route files
const cohortRoutes = require("./routes/cohort.routes");
const studentRoutes = require("./routes/student.routes");

// Use route files
app.use("/api/cohorts", cohortRoutes);
app.use("/api/students", studentRoutes);

// CONNECT TO DATABASE AND START SERVER
mongoose
  .connect("mongodb://localhost:27017/cohort-tools-api")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    // START SERVER
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to mongo", err));
