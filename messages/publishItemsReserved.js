
import { connectToOrderDirectExchange } from "./connectToExchanges.js";

async function publishItemsReservedEvent(message) {
    const { channel, exchangeName } = await connectToOrderDirectExchange();

    channel.publish(exchangeName, 'items reserved', Buffer.from(JSON.stringify(message)));
}

export {
    publishItemsReservedEvent
}