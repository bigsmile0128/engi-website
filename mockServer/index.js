require('dotenv').config();
const express = require('express');
const contact = require('./routes/contact');
const jobs = require('./routes/jobs');

const PORT = process.env.SERVER_PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/contact', contact);
app.use('/jobs', jobs);

app.listen(PORT, () => {
  console.log(`Mock server is running on port ${PORT}.`);
});
