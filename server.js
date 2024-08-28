const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post('/task', (req, res, next) => {
    const tasks = router.db.get('task').value();
    const lastTask = tasks[tasks.length - 1];
    const newId = lastTask ? parseInt(lastTask.id) + 1 : 1;
    
    req.body.id = newId.toString();  // Convert number to string
    next();
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
