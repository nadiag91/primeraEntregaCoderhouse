import { Router } from 'express';
import { ProductManager } from '../managers/productManager.js';

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
  const { limit } = req.query;
  const products = await manager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit));
    return res.json(limitedProducts);
  }

  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await manager.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: 'El producto no fue encontrado.' });
  }

  res.json(product);
});

router.post('/', async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  
  const newProduct = await manager.addProduct({
    title,
    description,
    code,
    price,
    status: status ?? true,
    stock,
    category,
    thumbnails: thumbnails || [],
  });

  res.status(201).json(newProduct);
});


router.put('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const data = req.body;

  if (data.id) {
    return res.status(400).json({ error: 'Error! No se puede modificar el ID.' });
  }

  const updated = await manager.updateProduct(id, data);

  if (!updated) {
    return res.status(404).json({ error: 'El producto no fue encontrado.' });
  }

  res.json(updated);
});

router.delete('/:pid', async (req, res) => {
  const id = parseInt(req.params.pid);
  const deleted = await manager.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Lo siento. El producto no fue encontrado.' });
  }

  res.json({ message: `El producto con id ${id} ha sido eliminado exitosamente.` });
});



export default router;
