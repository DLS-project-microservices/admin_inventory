import { Category, Product } from '../models/index.js';

async function findAllProducts() {
    const products = await Product.findAll({
        include: Category // Include associated categories
    });
    return products;
}

async function createProduct(product) {
    try {
        // Check if the categories array is provided
        if (!product.categories || product.categories.length === 0) {
            throw new Error("At least one category must be selected.");
        }

        // Create the product
        const newProduct = await Product.create(product);

        // Add associations with categories
        await newProduct.addCategories(product.categories);

        return newProduct;
    } catch (error) {
        console.error("Error in createProduct:", error);
        throw error;
    }
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