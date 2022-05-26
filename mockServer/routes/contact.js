const express = require('express');

const router = express.Router();

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

router.post('/', async (req, res) => {
  await sleep(1000);
  res.sendStatus(200);
});

router.put('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
