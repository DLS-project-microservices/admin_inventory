import connectToRabbitMQ from "./connection.js";

let orderExchange;
let channel;

async function connectToOrderExchange() {
    const exchangeName = 'order';

    if (!orderExchange || !channel) {
        try {
            channel = await connectToRabbitMQ();
            console.log(`Conneting to RabbitMQ exchange: ${exchangeName}...`)
            orderExchange = await channel.assertExchange(exchangeName, 'fanout', {
            durable: true
        });
            console.log(`Established connection to RabbitMQ exchange: ${exchangeName}`)
        }
        catch (error) {
            console.log(error);
        }
    }
    return {
        exchangeName,
        channel
    }
}

export {
    connectToOrderExchange
}