const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./routes/api');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

let clients = [];

app.get('/events', async (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };

  res.writeHead(200, headers);

  res.write(JSON.stringify({ message: 'DB is modified' }));

  const newClient = {
    id: Date.now(),
    res: res,
  };

  clients.push(newClient);

  req.on('close', () => {
    console.log(`${newClient.id} connection closed`);
    clients = clients.filter((c) => c.id != newClient.id);
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: clients.length,
  });
});

mongoose.connect('mongodb://mongo-1:27017?replicaSet=myRepl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
  const changeStream = db.collection('tasks').watch();

  changeStream.on('change', (change) => {
    console.log('DB is modified.');
    clients.forEach((c) =>
      c.res.write(JSON.stringify({ message: 'DB is modified' }))
    );
  });
});
