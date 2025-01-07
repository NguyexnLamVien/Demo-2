import { connectToRabbitMQ, consumerQueue } from "@config/rabbitMQ";
import { Message } from "amqplib";

const message = {
    consumerToQueue: async (queueName: string) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            await consumerQueue(channel, queueName);
        } catch (error) {
            console.log(error);
        }
    },

    consumerTOqueuNormal: async (queueName: string) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            const notificationQueue = 'notificationQueueProcessor';

            // const timeout = 15000;
            // setTimeout(() => {
            //     channel.consume(notificationQueue, (msg: Message | null) => {
            //         if (msg)
            //             console.log("SEND notificationQueue success: ", msg.content.toString());
            //         channel.ack(msg);
            //     })
            // }, timeout);

            channel.consume(notificationQueue, (msg: Message | null) => {
                try {
                    const numberTest = Math.random();
                    console.log({ numberTest });

                    if (numberTest < 0.8) { throw new Error('HOT FIX'); }
                    console.log("SEND notificationQueue success:", msg!.content.toString());
                    channel.ack(msg);
                } catch (error) {
                    // console.log(error);
                    channel.nack(msg, false, false);
                }
            })
        } catch (error) {
            console.log('error', error);
        }
    },

    consumerToQueueFail: async (queueName: string) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();

            const notificationExchangeDLX = 'notificationExDLX';
            const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX';
            const notificationQueueHandler = 'notificationQueueHotFix';

            await channel.assertExchange(notificationExchangeDLX, 'direct', { durable: true });

            const queueResult = await channel.assertQueue(notificationQueueHandler, { exclusive: false });

            await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX);

            channel.consume(queueResult.queue, (msgFailed: Message) => {
                console.log(`This is a failed message:, pls hot fix: ${msgFailed.content.toString()}`);
            }, { noAck: true });
        } catch (error) {
            console.log('error', error);
            throw error;

        }
    }
}

export default message;;