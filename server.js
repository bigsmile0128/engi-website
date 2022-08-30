const express = require('express');
const next = require('next');
const jobs = require('./mockServer/routes/jobs');
const repos = require('./server/routes/repos');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // update [...all].ts regex for production to use this server instead of proxying requests
    server.use('/api/jobs', jobs);
    server.use('/api/repos', repos);

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
