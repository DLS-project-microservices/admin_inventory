import { connectToProductExchange } from "./product.js";

async function publishCategoryEvent(category, categoryStatus) {
    if (!category || !categoryStatus) {
        throw new Error ('Invalid parameters: need to have both category and categoryStatus arguments')
    }
    const { exchangeName, channel} = await connectToProductExchange();
    const message = {
        status: categoryStatus,
        category: category
    }
    channel.publish(exchangeName, 'category change', Buffer.from(JSON.stringify(message)));
}

export {
    publishCategoryEvent
}