import { connectToOrderDirectExchange } from "./connectToExchanges.js";
import { publishItemsReservedEvent } from "./publishItemsReserved.js";

async function consumeOrderStarted() {

    const queueName = "inventory_service_consume_order_started"
    const { channel, exchangeName } = await connectToOrderDirectExchange();

    try {
        await channel.assertQueue(queueName, {
            durable: true
        });

        await channel.prefetch(1);
        await channel.bindQueue(queueName, exchangeName, 'order started');
        await channel.consume(queueName, async (msg) => {
            if(msg?.content) {
                const message = JSON.parse(msg.content.toString());
                // No functionality added yet, only the sequence of communication through RabbitMQ
                console.log('in consume order_started', message);
                await publishItemsReservedEvent(message);
  
                channel.ack(msg);
            }
        }, { 
            noAck: false 
        })
    }
    catch(error) {
        console.log(error);
        throw error
    }   
}

export {
    consumeOrderStarted
}