import express from 'express';
import { Product, Category } from './models/index.js'
import sequelize from './database/connection.js';

await sequelize.sync({ force: true });

const app = express();
//test workflow v2
app.get("/test", async (req, res) => {
    const createdProduct = await Product.create({ name: 'test product' });
    const createdCategory = await Category.create({ name: 'test category'});
    await createdProduct.addCategory(createdCategory);

    const foundProduct = await Product.findOne({
        where: {
            name: 'test product',
        },
        include: [Category]
    })

    res.send({ data: foundProduct })
})

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log('Server is listening on port', PORT));