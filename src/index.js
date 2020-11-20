const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const api = require('./routes/api');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'testing',
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
  });
});
