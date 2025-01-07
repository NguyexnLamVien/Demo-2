import * as amqp from 'amqplib';
import message from './consumerQueue.service';


async function consumerOrderedMessage() {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();

    const queueName = 'ordered_queue-message';

    await channel.assertQueue(queueName, { durable: true });

    channel.prefetch(1);

    channel.consume(queueName, (msg) => {
        const message = msg!.content.toString();

        setTimeout(() => {
            console.log(`Received message: ${message}`);
            channel.ack(msg!)

        }, Math.random() * 1000);
    })

}

consumerOrderedMessage().then(rs => console.log(rs)).catch(err => console.log(err));
