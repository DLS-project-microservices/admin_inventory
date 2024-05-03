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

/**
 * Publishes a product event to a RabbitMQ exchange.
 * @param {Object} product - The product for which the event is being published.
 * @param {string} productStatus - The status of the product (e.g., 'created', 'updated', 'deleted').
 * @throws {Error} If the product or productStatus parameters are not provided.
 * @returns {Promise<void>} Resolves when the message has been published; does not return a value.
 */
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


