import * as amqp from 'amqplib';
import message from './consumerQueue.service';


async function consumerOrderedMessage() {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();

    const queueName = 'ordered_queue-message';

    await channel.assertQueue(queueName, { durable: true });



    for (let i = 0; i < 10; i++) {
        const message = `ordered queue message: ${i}`;
        console.log(`Sending message: ${message}`);
        channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
    }

    setTimeout(() => {
        connection.close();
    }, 1000);
}

consumerOrderedMessage().then(rs => console.log(rs)).catch(err => console.log(err));
