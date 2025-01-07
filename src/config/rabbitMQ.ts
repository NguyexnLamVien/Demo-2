
import amqp, { Channel, Connection } from 'amqplib';

class RabbitMQConfig {
    private static instance: RabbitMQConfig;
    private connection: Connection | null = null;
    private channel: Channel | null = null;

    constructor() {
        this.connect().then(() => console.log('------------------Connected to RabbitMQ------------------'));
    }

    static getInstance(): RabbitMQConfig {
        if (!RabbitMQConfig.instance) {
            RabbitMQConfig.instance = new RabbitMQConfig();
        }
        return RabbitMQConfig.instance;
    }

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect('amqp://localhost');
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            throw error;
        }
    }

    getChannel(): Channel {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not initialized');
        }
        return this.channel;

    }
}

export default RabbitMQConfig.getInstance();

// const amqp = require('amqplib');


// const connectToRabbitMQ = async () => {
//     try {
//         const connection = await amqp.connect('amqp://localhost');
//         if (!connection) throw new Error('Cannot connect to RabbitMQ');
//         const channel = await connection.createChannel();
//         return { connection, channel };
//     } catch (error) {
//         console.error('Error connecting to RabbitMQ:', error);
//         throw error;
//     }
// }


// export { connectToRabbitMQ, consumerQueue };
