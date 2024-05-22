import { connectToOrderDirectExchange } from "./connectToExchanges.js";
import { publishItemsReservedFailedEvent } from "./publishItemsReservedFailed.js";
import { Product } from '../models/index.js';
import { incrementProduct } from "../service/product.js";

const { channel, exchangeName } = await connectToOrderDirectExchange();

async function consumeOrderFailed() {
    const queueName = "inventory_service_consume_order_failed"
    
    try {
        await channel.assertQueue(queueName, {
            durable: true
        });

        await channel.prefetch(1);
        await channel.bindQueue(queueName, exchangeName, 'payment captured failed');
        await channel.consume(queueName, async (msg) => {
            if (msg?.content) {
                const message = JSON.parse(msg.content.toString());
                console.log('in consume order_started', message);

                const orderLineItems = message.orderLineItems;

                for (const item of orderLineItems) {
                    const product = await Product.findOne({ where: { id: item.productId } });
                    console.log(product)

                    if (product) {
                       incrementProduct(product.id, product.quantity)
                        console.log(`Added ${item.quantity} to product ID ${item.productId}. New quantity: ${product.quantity}`);
                    } else {
                        console.error(`Product with ID ${item.productId} does not exist.`);
                    }
                }

                await publishItemsReservedFailedEvent(message);

                channel.ack(msg);
            }
        }, {
            noAck: false
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export {
    consumeOrderFailed
};
