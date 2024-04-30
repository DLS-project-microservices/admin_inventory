import connectToRabbitMQ from "./connection.js";

let productExchange;
let channel;

async function connectToProductExchange() {
    const exchangeName = 'product';

    if (!productExchange || !channel) {
        try {
            channel = await connectToRabbitMQ();
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

async function publishProductEvent(product, productStatus) {
    if (!product || !productStatus) {
        throw new Error('Invalid parameters: need to have both product and productStatus arguments')
    }
    const { exchangeName, channel} = await connectToProductExchange();
    const message = {
        status: productStatus,
        product: product
    }
    channel.publish(exchangeName, 'product change', Buffer.from(JSON.stringify(message)));
    }

await connectToProductExchange();

export {
    publishProductEvent,
    connectToProductExchange
}

