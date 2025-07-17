const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.get('/health', (req, res) => res.json({ status: 'ok' }));
server.use(router);
server.listen(3001, () => console.log('JSON Server running on port 3001'));