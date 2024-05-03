import { connectToProductExchange } from "./connectToExchanges.js";

async function publishItemsReservedEvent(message) {
    const { channel, exchangeName } = await connectToProductExchange();
    channel.publish(exchangeName, 'items reserved', Buffer.from(JSON.stringify(message)));
}

export {
    publishItemsReservedEvent
}