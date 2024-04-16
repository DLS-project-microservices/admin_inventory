import { Category, Product } from '../models/index.js';

async function findAllCategories() {
    try {
        const categories = await Category.findAll();
        return categories;
    } catch (error) {
        console.error("Error in findAllCategories:", error);
        throw error;
    }
}

async function createCategory(category) {
    try {
        const newCategory = await Category.create(category);
        return newCategory;
    } catch (error) {
        console.error("Error in createCategory:", error);
        throw error;
    }
}

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