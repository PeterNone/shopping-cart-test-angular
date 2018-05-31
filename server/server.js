const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/data.json');
const middlewares = jsonServer.defaults();

const rewrites = {
	"/api/*": "/$1",
	"/items/:id": "/item?reference=:id"
};

server.use(middlewares);

server.use(jsonServer.rewriter(rewrites))

server.use(router);

server.listen(3001, () => {
	console.log('JSON Server is running');
});
