import connectToRabbitMQ from "./connection.js";

let orderFanoutExchange;
let orderDirectExchange;
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

async function connectToOrderDirectExchange() {
    const exchangeName = 'order_direct';

    if (!orderDirectExchange || !channel) {
        try {
            channel = await connectToRabbitMQ();
            console.log(`Connecting to RabbitMQ exchange: ${exchangeName}...`)
            orderDirectExchange = await channel.assertExchange(exchangeName, 'direct', {
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

await connectToOrderDirectExchange();
await connectToOrderFanoutExchange();

export {
    connectToOrderFanoutExchange,
    connectToOrderDirectExchange
}