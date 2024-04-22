import connect from './connection.js'

async function publishCategoryEvent(category, categoryStatus) {
    if (!category || !categoryStatus) {
        throw new Error ('Invalid parameters: need to have both category and categoryStatus arguments')
    }
    const {channel, exchange} = await connect();
    const message = {
        status: categoryStatus,
        category: category
    }
    channel.publish(exchange, 'category change', Buffer.from(JSON.stringify(message)));
}

export {
    publishCategoryEvent
}