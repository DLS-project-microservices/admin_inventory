import express from 'express';
import { 
    findAllProducts,
    findProductByName,
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct
} from '../service/product.js';

/** Instansiates the router. */
const router = express.Router();

/** Endpoint to fetch all products. */
router.get('/', async (req, res) => {
    try {
        const allProducts = await findAllProducts();
        res.status(200).send(allProducts);
    } catch (error) {
        console.error("Error fetching all products:", error);
        res.status(500).send({ error: "Error fetching all products" });
    }
});

/** Endpoint to create a product. */
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const foundProduct = await findProductByName(name);
        if (foundProduct) {
            return res.status(403).send({ message: `A product with the name: ${name} already exists` });
        }
        
        const newProduct = await createProduct(req.body);
        res.status(200).send(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send({ error: "Error creating product" });
    }
});

/** Endpoint to find product from id. */
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

/** Endpoint to update a product from id. */
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

/** Endpoint to delete a product from id. */
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
