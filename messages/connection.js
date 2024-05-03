import 'dotenv/config';
import amqp from 'amqplib';

let channel;

/**
 * Connects to a RabbitMQ exchange and returns the channel and exchange name.
 * If a connection has already been established, it reuses the existing channel.
 * @returns {Promise<{channel: Object, exchange: string}>} An object containing the channel and exchange name.
 * @throws {Error} If an error occurs while connecting to the RabbitMQ server or creating the channel.
 */
async function connectToRabbitMQ() {
    if (!channel) {
        try {
            console.log('Establishing connection to RabbitMQ...')
            const connection = await amqp.connect(`amqp://${process.env.AMQP_HOST}`);channel = await connection.createChannel();
            console.log('Connection to RabbitMQ established.')
        }
        catch(error) {
            console.log(error);
            throw error;
        }
        
    }
    return channel;
}

export default connectToRabbitMQ;