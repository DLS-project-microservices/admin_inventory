import { Category, Product } from '../models/index.js';

/**
 * Fetches all products and their category.
 * @returns {Array}
 */
async function findAllProducts() {
    const products = await Product.findAll({
        include: Category // Include associated categories
    });
    return products;
}

/**
 * Creates a new product.
 * @constructor
 * @param {object} product - The product to be created.
 * @returns {object}
 */
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

/**
 * Fetches a specific product based off its id.
 * @param {int} id - The id of the object that needs to be found.
 * @returns {object}
 */
async function findProduct(id) {
    const product = await Product.findOne({
        where: {
            id: id,
        },
        include: [Category]
    })
    return product;
}

/**
 * Updates a product based off its id.
 * @param {object} product - The product containing updated information
 * @param {int} id - The id of the product that needs updating.
 * @returns {object}
 */
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

/**
 * Deletes a product based off its id.
 * @param {int} id 
 * @returns {int}
 */
async function deleteProduct(id) {
    const productToDelete = await Product.destroy({
        where: {
            id: id
        }
    });
    console.log(productToDelete);
    return productToDelete;
}

/** Exports our methods to be used by routes. */
export {
    findAllProducts,
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct
}