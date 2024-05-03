import connectToRabbitMQ from "./connection.js";

let orderFanoutExchange;
let productExchange;
let channel;

async function connectToOrderFanoutExchange() {
    const exchangeName = 'order';

    if (!orderFanoutExchange || !channel) {
        try {
            channel = await connectToRabbitMQ();
            console.log(`Connecting to RabbitMQ exchange: ${exchangeName}...`)
            orderFanoutExchange = await channel.assertExchange(exchangeName, 'fanout', {
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

async function connectToProductExchange() {
    const exchangeName = 'product';

    if (!productExchange || !channel) {
        try {
            channel = await connectToRabbitMQ();
            console.log(`Connecting to RabbitMQ exchange: ${exchangeName}...`)
            productExchange = await channel.assertExchange(exchangeName, 'direct', {
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

await connectToProductExchange();
await connectToOrderFanoutExchange();

export {
    connectToOrderFanoutExchange,
    connectToProductExchange
}