import { connectToProductExchange } from "./product.js";

/**
 * Publishes a category event to a RabbitMQ exchange.
 * @param {Object} category - The category for which the event is being published.
 * @param {string} categoryStatus - The status of the category (e.g., 'created', 'updated', 'deleted').
 * @throws {Error} If the category or categoryStatus parameters are not provided.
 * @returns {Promise<void>} Resolves when the message has been published; does not return a value.
 */
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