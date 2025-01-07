import message from "./modules/rabbitMQ/consumerQueue.service";

const { consumerToQueue, consumerTOqueuNormal, consumerToQueueFail } = message
const queueName = 'test-topic'

consumerTOqueuNormal(queueName).then(() => {
    console.log(`Message consumerToQueueNormal started`);

}).catch(error => console.log(`Message Error:`, error.message));

consumerToQueueFail(queueName).then(() => {
    console.log(`Message consumerToQueueFail started`)

}).catch(error => console.log(`Message Error:`, error.message));