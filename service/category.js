import { Category, Product } from '../models/index.js';

async function findAllCategories() {
    const categories = await Category.findAll();
    return categories;
}

async function createCategory(category) {
    const newCategory = await Category.create(category);
    return newCategory;
}

async function findCategoryById(id) {
    const category = await Category.findOne({
        where: {
            id: id,
        },
        include: [Product]
    });
    return category;
}

async function updateCategoryById(category, id) {
    const updatedCategory = await Category.update(category, {
        where:{
            id: id,
        }
    });
    return updatedCategory;
}

async function deleteCategoryById(id) {
    const categoryToDelete = await Category.destroy({
        where: {
            id: id,
        }
    });
    return categoryToDelete;
}
 export {
    findAllCategories,
    createCategory,
    findCategoryById,
    updateCategoryById,
    deleteCategoryById 
}