const channelObject = require('../exchange');

const exchangeName = process.env.EXCHANGE_NAME;

async function subscriber() {
  const channel = await channelObject();
  const { queue } = await channel.assertQueue('', { exclusive: true });

  console.log('waiting for messages in queue', queue);
  await channel.bindQueue(queue, exchangeName, '');

  await channel.consume(queue, function(message) {
    if (message.content) {
      console.log({
        queue,
        message: JSON.parse(message.content.toString())
      });
    }
  }, { noAck: true });
}

subscriber();
