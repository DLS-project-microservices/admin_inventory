import { connectToOrderDirectExchange } from "./connectToExchanges.js";

const { channel, exchangeName } = await connectToOrderDirectExchange();

async function publishItemsReservedFailedEvent(message) {
    channel.publish(exchangeName, 'items reserved failed', Buffer.from(JSON.stringify(message)));
}

export {
    publishItemsReservedFailedEvent
}