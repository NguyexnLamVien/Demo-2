import * as amqp from 'amqplib';
const runProducer = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost');
        const channel = await connection.createChannel();

        const notificationExchange = 'notificationEx';
        const notificationQueue = 'notificationQueueProcessor';
        const notificationExchangeDLX = 'notificationExDLX';
        const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';

        await channel.assertExchange(notificationExchange, 'direct', { durable: true });
        const queueResult = await channel.assertQueue(notificationQueue, {
            exclusive: false,
            deadLetterExchange: notificationExchangeDLX,
            deadLetterRoutingKey: notificationRoutingKeyDLX,
        });

        await channel.bindQueue(queueResult.queue, notificationExchange, notificationRoutingKeyDLX);

        const mgs = 'a new product';
        console.log('product mgs:', mgs);
        await channel.sendToQueue(queueResult.queue, Buffer.from(mgs), {
            expiration: '10000'
        });

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.log('error', error);
    }
}

runProducer().then(rs => console.log(rs)).catch(err => console.log(err));

export default runProducer 