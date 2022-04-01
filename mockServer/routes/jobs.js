const express = require('express');
const _ = require('lodash');
const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');
const dayjs = require('dayjs');

const router = express.Router();

function createJobs(numJobs) {
  const languages = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Rust',
    'C++',
    'Java',
  ].sort();

  const jobs = [];
  for (let i = 0; i < numJobs; i++) {
    const numTests = _.random(5, 25);
    jobs.push({
      language: languages[_.random(0, languages.length - 1)],
      title: `${_.startCase(faker.hacker.verb())} the ${faker.hacker.noun()}`,
      description: Array.from({ length: 5 })
        .map(() => faker.hacker.phrase())
        .join(' '),
      numTests,
      testsPassed: _.random(1, numTests),
      timeEstimate: _.random(1, 20),
      reward: _.random(10, 100) * 10,
      numContributors: _.random(1, 50),
      id: uuid(),
      created: dayjs().subtract(_.random(3, 20), 'day').format(),
    });
  }

  return jobs;
}

const jobDb = createJobs(247);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

router.get('/', async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || 10;
  const pageNum = query.pageNum || 0;

  // handle single or multiple language input
  let languages;
  if (Array.isArray(query.language)) {
    languages = new Set(query.language);
  } else if (query.language) {
    languages = new Set([query.language]);
  } else {
    languages = new Set();
  }

  const jobs = jobDb.filter((job) => {
    if (languages.size > 0 && !languages.has(job.language)) {
      return false;
    }
    return true;
  });

  // artificial delay
  await sleep(5000);

  res.json({
    numResults: jobs.length,
    results: jobs.slice(pageNum * pageSize, pageNum * pageSize + pageSize),
    numPages: Math.floor(jobs.length / pageSize),
  });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const job = jobDb.find((job) => job.id === id);

  // artificial delay
  await sleep(1500);

  res.json(job || jobDb[0] || createJobs(1)[0]);
});

module.exports = router;
