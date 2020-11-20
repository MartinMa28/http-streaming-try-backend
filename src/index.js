const express = require('express');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'testing',
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
