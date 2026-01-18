// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format"
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate key error",
      field: Object.keys(err.keyPattern)[0]
    });
  }

  // Default error
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;