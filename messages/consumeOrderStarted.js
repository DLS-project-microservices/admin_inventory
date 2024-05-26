import { connectToOrderDirectExchange } from "./connectToExchanges.js";
import { publishItemsReservedEvent } from "./publishItemsReserved.js";
import { publishItemsReservedFailedEvent } from "./publishItemsReservedFailed.js";
import { Product } from '../models/index.js';
import { decrementProduct } from "../service/product.js";

const { channel, exchangeName } = await connectToOrderDirectExchange();

async function consumeOrderStarted() {
    const queueName = "inventory_service_consume_order_started"
    
    try {
        await channel.assertQueue(queueName, {
            durable: true
        });

        await channel.prefetch(1);
        await channel.bindQueue(queueName, exchangeName, 'order started');
        await channel.consume(queueName, async (msg) => {
            if (msg?.content) {
                const message = JSON.parse(msg.content.toString());
                console.log('in consume order_started', message);

                const orderLineItems = message.orderLineItems;
                let allItemsAvailable = true;

                for (const item of orderLineItems) {
                    const product = await Product.findOne({ where: { id: item.productId } });

                    if (!product) {
                        console.error(`Product with ID ${item.productId} does not exist.`);
                        allItemsAvailable = false;
                        break;
                    }

                    if (product.quantity < item.quantity) {
                        allItemsAvailable = false;
                        break;
                    }
                    
                }

                if (allItemsAvailable) {
                    for (const item of orderLineItems) {
                        decrementProduct(item.productId, item.quantity)
                    }
                    await publishItemsReservedEvent(message);
                } else {
                    console.error('One or more items are not available or do not have enough stock.');
                    await publishItemsReservedFailedEvent(message);
                }

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
    consumeOrderStarted
};