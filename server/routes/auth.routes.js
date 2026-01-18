const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const isAuthenticated = require("../middleware/jwt.middleware");

const saltRounds = 10;

// POST /auth/signup - Creates a new user
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Validate that all fields are provided
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please provide email, password, and name" });
    }

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter" 
      });
    }

    // Check if user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the new user
    const createdUser = await User.create({ email, password: hashedPassword, name });

    // Destructure to remove password from response
    const { _id } = createdUser;

    res.status(201).json({ 
      message: "User created successfully",
      user: { email, name, _id } 
    });

  } catch (error) {
    next(error);
  }
});

// POST /auth/login - Verifies email and password and returns a JWT
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate that all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find the user by email
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (!passwordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Destructure user object
    const { _id, name } = foundUser;

    // Create the payload for the token
    const payload = { _id, email, name };

    // Create and sign the token
    const authToken = jwt.sign(
      payload,
      process.env.TOKEN_SECRET || "your-secret-key-change-this",
      { algorithm: "HS256", expiresIn: "6h" }
    );

    // Send the token as the response
    res.status(200).json({ authToken });

  } catch (error) {
    next(error);
  }
});

// GET /auth/verify - Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT is valid, the payload gets decoded by the isAuthenticated middleware
  // and made available on `req.payload`
  console.log("req.payload:", req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});

module.exports = router;