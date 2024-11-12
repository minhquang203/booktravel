const express = require('express');
const router = express.Router();

// Example route for user
router.get('/', (req, res) => {
  res.send('User page');
});

module.exports = router;
