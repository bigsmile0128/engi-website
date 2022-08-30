require('dotenv').config();
const express = require('express');
const contact = require('./routes/contact');
const contact_us = require('./routes/contact_us');
const jobs = require('./routes/jobs');
const repos = require('../server/routes/repos');

const PORT = process.env.SERVER_PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/contact', contact);
app.use('/contact_us', contact_us);
app.use('/jobs', jobs);
app.use('/repos', repos);

app.listen(PORT, () => {
  console.log(`Mock server is running on port ${PORT}.`);
});
