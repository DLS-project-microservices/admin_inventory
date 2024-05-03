import { Category, Product } from '../models/index.js';

/**
 * Fetches all categories from the database.
 * @returns {Promise<Array>} An array of all categories.
 * @throws {Error} If an error occurs during the database operation.
 */
async function findAllCategories() {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        console.error("Error in findAllCategories:", error);
        throw error;
    }
}

/**
 * Creates a new category in the database.
 * @param {Object} category - The category to create.
 * @returns {Promise<Object>} The created category.
 * @throws {Error} If an error occurs during the database operation.
 */
async function createCategory(category) {
    try {
        const newCategory = await Category.create(category);
        return newCategory;
    } catch (error) {
        console.error("Error in createCategory:", error);
        throw error;
    }
}

/**
 * Fetches a category by its ID from the database, including its associated products.
 * @param {number} id - The ID of the category to fetch.
 * @returns {Promise<Object>} The fetched category.
 * @throws {Error} If an error occurs during the database operation.
 */
async function findCategoryById(id) {
    try {
        const category = await Category.findOne({
            where: {
                id: id,
            },
            include: [Product]
        });
        return category;
    } catch (error) {
        console.error("Error in findCategoryById:", error);
        throw error;
    }
}

/**
 * Updates a category by its ID in the database.
 * @param {Object} category - The category data to update.
 * @param {number} id - The ID of the category to update.
 * @returns {Promise<Object>} The updated category.
 * @throws {Error} If an error occurs during the database operation.
 */
async function updateCategoryById(category, id) {
    try {
        const updatedCategory = await Category.update(category, {
            where:{
                id: id,
            }
        });
        return updatedCategory;
    } catch (error) {
        console.error("Error in updateCategoryById:", error);
        throw error;
    }
}

/**
 * Deletes a category by its ID from the database.
 * @param {number} id - The ID of the category to delete.
 * @returns {Promise<number>} The number of categories deleted.
 * @throws {Error} If an error occurs during the database operation.
 */
async function deleteCategoryById(id) {
    try {
        const categoryToDelete = await Category.destroy({
            where: {
                id: id,
            }
        });
        return categoryToDelete;
    } catch (error) {
        console.error("Error in deleteCategoryById:", error);
        throw error;
    }
}

export {
    findAllCategories,
    createCategory,
    findCategoryById,
    updateCategoryById,
    deleteCategoryById 
}