import 'dotenv/config';
import amqp from 'amqplib';

let connection = null;
let channel = null;
const exchange = 'product';

/**
 * Connects to a RabbitMQ exchange and returns the channel and exchange name.
 * If a connection has already been established, it reuses the existing channel.
 * @returns {Promise<{channel: Object, exchange: string}>} An object containing the channel and exchange name.
 * @throws {Error} If an error occurs while connecting to the RabbitMQ server or creating the channel.
 */
async function connectToRabbitMQ() {

    if (channel) {
        return { channel, exchange };
    }

    console.log(`Connecting to RabbitMQ exchange: "${exchange}"...`);

    try {
        connection = await amqp.connect(`amqp://${process.env.AMQP_HOST}`);
        channel = await connection.createChannel();

        await channel.assertExchange(exchange, 'direct', {
            durable: true
        });
    } catch (error) {
        console.log(error);
    }

    console.log(`Connection to RabbitMQ exchange: "${exchange}" established`);
    return { channel, exchange };
}

export default connectToRabbitMQ;