import { connectToOrderDirectExchange } from "./connectToOrderExchanges.js";

async function publishItemsReservedEvent(message) {
    const { channel, exchangeName } = await connectToOrderDirectExchange();
    channel.publish(exchangeName, 'category change', Buffer.from(JSON.stringify(message)));
}

export {
    publishItemsReservedEvent
}