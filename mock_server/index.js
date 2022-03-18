const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./mock_server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.post('/contact', (req, res) => {
  res.sendStatus(200);
});

server.put('/contact', (req, res) => {
  res.sendStatus(200);
});

server.use(router);
server.listen(8000, () => {
  console.log('JSON Server is running');
});
