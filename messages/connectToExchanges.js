import connectToRabbitMQ from "./connection.js";

let orderDirectExchange;
let orderFanoutExchange;
let productExchange;
let channel;

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

async function connectToOrderFanoutExchange() {
    const exchangeName = 'order_fanout';

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

await connectToOrderDirectExchange();
await connectToOrderFanoutExchange();
await connectToProductExchange();

export {
    connectToOrderDirectExchange,
    connectToOrderFanoutExchange,
    connectToProductExchange
}