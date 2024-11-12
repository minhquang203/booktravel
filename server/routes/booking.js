const express = require('express');
const router = express.Router();

// Example route for booking
router.get('/', (req, res) => {
  res.send('Booking page');
});

module.exports = router;
