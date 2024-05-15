import { connectToRabbitMQ } from "amqplib-retry-wrapper-dls";

let orderDirectExchange;
let orderFanoutExchange;
let productExchange

const channel = await connectToRabbitMQ(process.env.AMQP_HOST);

async function connectToOrderDirectExchange() {
    const exchangeName = 'order_direct';

    if (!orderDirectExchange || !channel) {
        try {
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
            console.log(`Conneting to RabbitMQ exchange: ${exchangeName}...`)
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
    connectToProductExchange,
    
}