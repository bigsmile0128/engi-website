const express = require('express');
const _ = require('lodash');
const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');

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
    jobs.push({
      language: languages[_.random(0, languages.length - 1)],
      title: faker.hacker.phrase(),
      numTests: _.random(5, 25),
      testsPassed: _.random(1, 25),
      timeEstimate: _.random(1, 20),
      reward: _.random(10, 100) * 10,
      numContributors: _.random(1, 50),
      id: uuid(),
    });
  }

  return jobs;
}

const jobDb = createJobs(200);

router.get('/', (req, res) => {
  const { query } = req;

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

  res.json({
    numResults: jobs.length,
    results: jobs,
  });
});

module.exports = router;
