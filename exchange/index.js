const { config } = require('dotenv');
const connect = require('./client');

config();
const exchangeName = process.env.EXCHANGE_NAME;

async function createExchangeChannel() {
  const connection = await connect();
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'fanout', { durability: false });

  return channel;
}

module.exports = createExchangeChannel;
