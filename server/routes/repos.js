const express = require('express');
const { Octokit } = require('@octokit/core');

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

const router = express.Router();

async function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

router.get('/:owner/:name/readme', async (req, res) => {
  const { owner, name } = req.params;
  console.log('owner', owner);
  console.log('name', name);
  try {
    const {
      data: { content },
    } = await octokit.request('GET /repos/{owner}/{repo}/readme', {
      owner,
      repo: name,
    });
    res.send(Buffer.from(content, 'base64'));
  } catch (error) {
    res.sendStatus(error.response.status);
  }
});

router.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
