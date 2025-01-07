
// const amqp = require('amqplib');

async function sendMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'task_queue';
    const msg = 'Hello, RabbitMQ!';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(`Sent: ${msg}`);

    setTimeout(() => {
        connection.close();
    }, 500);
}

sendMessage();
