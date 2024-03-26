import { Category, Product } from '../models/index.js';

async function findAllProducts() {
    const products = await Product.findAll();
    return products;
}

async function createProduct(product) {
    const newProduct = await Product.create(product);
    return newProduct;
}

async function findProduct(id) {
    const product = await Product.findOne({
        where: {
            id: id,
        },
        include: [Category]
    })
    return product;
}

async function updateProduct(product, id) {
    const newProduct = await Product.update(product, {
        where: {
            id: id,
        }
    });
    console.log(newProduct);
    return newProduct;
}

async function deleteProduct(id) {
    const productToDelete = await Product.destroy({
        where: {
            id: id
        }
    });
    console.log(productToDelete);
    return productToDelete;
}

export {
    findAllProducts,
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct
}