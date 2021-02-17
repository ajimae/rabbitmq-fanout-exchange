const { config } = require('dotenv');
const connectionObject = require('./client');
const channelObject = require('../exchange');

config();
const exchangeName = process.env.EXCHANGE_NAME;
const message = {
  name: 'publisher service',
  data: 'This is a message from the publisher service'
}

async function publisher() {
  const channel = await channelObject()
  channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
  console.log('message published successfully');

  setTimeout(async function() {
    const connection = await connectionObject();
    await connection.close()
    process.exit(0);
  }, 1000);
}

publisher();
