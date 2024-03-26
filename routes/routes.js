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
  const allProducts = await findAllProducts();
  console.log(allProducts);
  res.status(200).send(allProducts);
});

// Create an item
router.post('/', async (req, res) => {
  const newProduct = await createProduct(req.body);
  res.status(200).send(newProduct);
});

// Find item
router.get('/:id', async (req, res) =>{
  const id = req.params.id;
  const ourProduct = await findProduct(id);
  if (!ourProduct) {
    return res.status(404).send({ message: `ERROR: Product ID: ${id} could not be found` });
  }
  res.status(200).send(ourProduct);
})

// Update an item by ID
// TODO: Optimize function so it doesn't need to find product twice.
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const ourProduct = await findProduct(id);
  if (!ourProduct) {
    return res.status(404).send({ message: `ERROR: Product ID: ${id} could not be found` });
  } 
  await updateProduct(req.body, id);
  const updatedProduct = await findProduct(id)
  return res.status(200).send(updatedProduct);
  });

// Delete an item by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const ourProduct = await findProduct(id);
  if (!ourProduct) {
    return res.status(404).send({ message: `ERROR: Product ID: ${id} could not be found` });
  } 
  await deleteProduct(id);
  return res.status(200).send({ message: `Product ID: ${id} successfully deleted` })
  });

export default router;