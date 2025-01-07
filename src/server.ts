import dotenv from 'dotenv';
import { connectDB } from './config/database';
import app from './app';
import RabbitMQConfig from './config/rabbitMQ';
dotenv.config();

const PORT = process.env.PORT;

connectDB();
RabbitMQConfig;
app.listen(PORT, () => {
    console.log(`--------Server running http://localhost:${PORT}--------`);
});

