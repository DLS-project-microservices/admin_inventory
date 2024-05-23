import { Category, Product } from '../models/index.js';
import { publishProductEvent } from '../messages/product.js'

/**
 * Fetches all products from the database, including their associated categories.
 * @returns {Promise<Array>} An array of all products.
 */
async function findAllProducts() {
    const products = await Product.findAll({
        include: Category // Include associated categories
    });
    return products;
}

/**
 * Creates a new product and associates it with categories.
 * @param {Object} product - The product to create. Must include a 'categories' array.
 * @returns {Promise<Object>} The created product.
 * @throws {Error} If the 'categories' array is not provided or is empty.
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

        const createdProduct = await Product.findOne({
            where: {
                id: newProduct.dataValues.id,
            },
            include: [Category]
        })
        await publishProductEvent(createdProduct, "created");

        return createdProduct;
    } catch (error) {
        console.error("Error in createProduct:", error);
        throw error;
    }
}

/**
 * Fetches a product by its ID, including its associated categories.
 * @param {number} id - The ID of the product to fetch.
 * @returns {Promise<Object>} The fetched product.
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


async function findProductByName(name) {
    const product = await Product.findOne({
        where: {
            name: name,
        },
        include: [Category]
    })
    return product;
}


/**
 * Updates a product and its associated categories.
 * @param {Object} product - The product data to update.
 * @param {number} id - The ID of the product to update.
 * @returns {Promise<Object>} The updated product.
 * @throws {Error} If a product with the provided ID is not found.
 */
async function updateProduct(product, id) {
    try {
        const existingProduct = await Product.findByPk(id);
        if (!existingProduct) {
            throw new Error(`Product with ID ${id} not found`);
        }

        await existingProduct.update(product);

        if (!product.categories) {
            await existingProduct.setCategories([]);
        } else if (product.categories && product.categories.length > 0) {
            await existingProduct.setCategories(product.categories);
        }

        const updatedProduct = await Product.findByPk(id, { include: Category });
        await publishProductEvent(updatedProduct, "updated");

        return updatedProduct;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

/**
 * Deletes a product by its ID.
 * @param {number} id - The ID of the product to delete.
 * @returns {Promise<number>} The number of products deleted.
 */
async function deleteProduct(id) {
    const productToBeDeleted = await findProduct(id);
    
    await Product.destroy({
        where: {
            id: productToBeDeleted.dataValues.id
        }
    });
    await publishProductEvent(productToBeDeleted, "deleted");

    return productToBeDeleted;
}

export {
    findAllProducts,
    findProductByName,
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct
}