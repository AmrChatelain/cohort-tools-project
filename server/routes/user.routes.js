const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const isAuthenticated = require("../middleware/jwt.middleware");

// GET /api/users/:id - Get a specific user by id (Protected route)
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find user but exclude password from response
    const user = await User.findById(id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;