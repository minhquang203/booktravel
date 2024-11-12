const express = require("express");
const router = express.Router();

// Define routes for properties
router.get("/", (req, res) => {
  res.send("Listing of properties");
});

// Export the router
module.exports = router;
