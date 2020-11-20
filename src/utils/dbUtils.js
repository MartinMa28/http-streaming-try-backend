const MongoClient = require('mongodb').MongoClient;

async function withDb(callable) {
  const client = await MongoClient.connect('mongodb://mongo-1:27017', {
    useUnifiedTopology: true,
  });
  const db = client.db('streaming_database');
  await callable(db);

  client.close();
}

module.exports = withDb;
