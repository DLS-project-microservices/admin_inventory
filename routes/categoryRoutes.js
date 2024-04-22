import express from 'express';
import {
    findAllCategories,
    createCategory,
    findCategoryById,
    updateCategoryById,
    deleteCategoryById
} from '../service/category.js';
import { publishCategoryEvent } from '../messages/category.js';

const categoryRoutes = express.Router();

categoryRoutes.get('/', async (req, res) => {
    try {
        const getAllCategories = await findAllCategories();
        console.log(getAllCategories);
        res.status(200).send(getAllCategories);
    } catch (error) {
        console.error("Error fetching all categories:", error);
        res.status(500).send({ error: "Error fetching all categories" });
    }
});

categoryRoutes.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categoryById = await findCategoryById(id);
        if (!categoryById) {
            return res.status(404).send({ message: `ERROR: Category ID: ${id} could not be found` });
        }
        res.status(200).send(categoryById);
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        res.status(500).send({ error: "Error fetching category by ID" });
    }
});

categoryRoutes.post('/', async (req, res) => {
    try {
        const newCategory = await createCategory(req.body);
        await publishCategoryEvent(newCategory, 'created')
        res.status(200).send(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).send({ error: "Error creating category" });
    }
});

categoryRoutes.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categoryById = await findCategoryById(id);
        if (!categoryById) {
            return res.status(404).send({ message: `ERROR: Category ID: ${id} could not be found` });
        }
        const updateCategory = await updateCategoryById(req.body, id);
        if (!updateCategory) {
            return res.status(500).send({ message: `ERROR: Failed to update category with ID: ${id}` });
        }
        const category = await findCategoryById(id)
        await publishCategoryEvent(category, 'updated')
        res.status(200).send(category);
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).send({ error: "Error updating category" });
    }
});

categoryRoutes.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categoryById = await findCategoryById(id);
        if (!categoryById) {
            return res.status(404).send({ message: `ERROR: Category ID: ${id} could not be found` });
        }
        await deleteCategoryById(id);
        await publishCategoryEvent(categoryById, 'deleted')
        res.status(200).send({ message: `Category ID: ${id} successfully deleted` });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).send({ error: "Error deleting category" });
    }
});

export default categoryRoutes;
