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
    try {
        const existingProduct = await Product.findByPk(id);
        if (!existingProduct) {
            throw new Error(`Product with ID ${id} not found`);
        }

        await existingProduct.update(product);

        if (product.categories === null || product.categories.length === 0) {
            await existingProduct.setCategories([]);
        } else if (product.categories && product.categories.length > 0) {
            await existingProduct.setCategories(product.categories);
        }

        const updatedProduct = await Product.findByPk(id, { include: Category });

        return updatedProduct;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
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