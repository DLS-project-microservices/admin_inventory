import express from 'express';
import {
    findAllCategories,
    createCategory,
    findCategoryById,
    updateCategoryById,
    deleteCategoryById
} from '../service/category.js'

const categoryRoutes = express.Router();

categoryRoutes.get('/', async (req, res) => {

    const getAllCategories = await findAllCategories();
    console.log(getAllCategories);
    res.status(200).send(getAllCategories);
});

categoryRoutes.get('/:id', async (req, res) => {
    const id = req.params.id;
    const categoryById = await findCategoryById(id);
    if(!categoryById ) {
        return res.status(404).send({ message: `ERROR: Category ID: ${id} could not be found`})
    }
    res.status(200).send(categoryById);
});

categoryRoutes.post('/', async (req, res) => {
    //const {name, description} = req.body;
    const newCategory = await createCategory(req.body);
    res.status(200).send(newCategory);
});

categoryRoutes.put('/:id', async (req, res) => {
    const id = req.params.id;
    const categoryById = await findCategoryById(id);
    if(!categoryById ) {
        return res.status(404).send({ message: `ERROR: Category ID: ${id} could not be found`})
    }
    const updateCategory = await updateCategoryById(req.body, id);
    if (!updateCategory) {
        return res.status(500).send({ message: `ERROR: Failed to update category with ID: ${id}` });
      }
    return res.status(200).send(updateCategory);
});

categoryRoutes.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const categoryById = await findCategoryById(id);
    if (!categoryById ) {
        return res.status(404).send({ message: `ERROR: Category ID: ${id} could not be found` });
    }
    await deleteCategoryById(id);
    return res.status(200).send({ message: `Category ID: ${id} successfully deleted` })
});

export default categoryRoutes;

