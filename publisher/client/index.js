const amqplib = require('amqplib');
const { config } = require('dotenv');

config();
async function connect(url) {
  url = url || process.env.RABBITMQ_URL;
  const connection = await amqplib.connect(url);

  return connection;
}

module.exports = connect;
