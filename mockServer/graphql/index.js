const express = require('express');
const router = express.Router();
const mockJobs = require('./mockJobs.json');

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

router.post('/', async (req, res) => {
  await sleep(1000);

  const query = req.body.query ?? '';
  if (query.includes('EngiHealthStatusQuery')) {
    res.json({
      data: {
        health: {
          chain: 'Engi testnet',
          nodeName: 'Engi Node',
          version: '4.0.0-dev-3b5933e850c',
          status: 'ONLINE',
          peerCount: 4,
        },
      },
    });
    return;
  } else if (query.includes('JobSearch')) {
    res.json(mockJobs);
    // res.json({
    //   data: {
    //     jobs: {
    //       result: {
    //         totalCount: 0,
    //         items: [],
    //       },
    //     },
    //   },
    // });
    return;
  }

  res.sendStatus(500);
});

module.exports = router;
