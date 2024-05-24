import { connectToOrderFanoutExchange } from "./connectToExchanges.js";

const { channel, exchangeName } = await connectToOrderFanoutExchange();

async function publishItemsReservedEvent(message) {
    channel.publish(exchangeName, 'items_reserved_failed', Buffer.from(JSON.stringify(message)));
}

export {
    publishItemsReservedEvent
}