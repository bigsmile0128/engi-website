const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.sendStatus(200);
});

router.put('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
