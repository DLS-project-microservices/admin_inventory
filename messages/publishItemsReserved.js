import { connectToOrderFanoutExchange } from "./connectToExchanges.js";

const { channel, exchangeName } = await connectToOrderFanoutExchange();

async function publishItemsReservedEvent(message) {
    channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
}

export {
    publishItemsReservedEvent
}