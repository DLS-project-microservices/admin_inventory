import express from 'express';
import { 
    findAllProducts,
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct
} from '../service/product.js';

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    try {
        const allProducts = await findAllProducts();
        console.log(allProducts);
        res.status(200).send(allProducts);
    } catch (error) {
        console.error("Error fetching all products:", error);
        res.status(500).send({ error: "Error fetching all products" });
    }
});

// Create an item
router.post('/', async (req, res) => {
    try {
        const newProduct = await createProduct(req.body);
        res.status(200).send(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send({ error: "Error creating product" });
    }
});

// Find item
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ourProduct = await findProduct(id);
        if (!ourProduct) {
            return res.status(404).send({ message: `ERROR: Product ID: ${id} could not be found` });
        }
        res.status(200).send(ourProduct);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).send({ error: "Error fetching product by ID" });
    }
});

// Update an item by ID
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ourProduct = await findProduct(id);
        if (!ourProduct) {
            return res.status(404).send({ message: `ERROR: Product ID: ${id} could not be found` });
        } 
        await updateProduct(req.body, id);
        const updatedProduct = await findProduct(id);
        return res.status(200).send(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send({ error: "Error updating product" });
    }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ourProduct = await findProduct(id);
        if (!ourProduct) {
            return res.status(404).send({ message: `ERROR: Product ID: ${id} could not be found` });
        } 
        await deleteProduct(id);
        return res.status(200).send({ message: `Product ID: ${id} successfully deleted` });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send({ error: "Error deleting product" });
    }
});

export default router;
