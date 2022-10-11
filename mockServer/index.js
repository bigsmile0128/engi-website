require('dotenv').config();
const express = require('express');
const graphql = require('./graphql');

const PORT = process.env.SERVER_PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/graphql', graphql);

app.listen(PORT, () => {
  console.log(`Mock server is running on port ${PORT}.`);
});
