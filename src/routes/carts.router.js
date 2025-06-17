import { Router } from 'express';
import { CartManager } from '../managers/cartManager.js';

const router = Router();
const manager = new CartManager();


router.post('/', async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
});


router.get('/:cid', async (req, res) => {
  const id = parseInt(req.params.cid);
  const cart = await manager.getCartById(id);

  if (!cart) {
    return res.status(404).json({ error: 'Lo siento, el carrito no fue encontrado' });
  }

  res.json(cart.products);
});


router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const updatedCart = await manager.addProductToCart(cartId, productId);

  if (!updatedCart) {
    return res.status(404).json({ error: 'Lo siento, el carrito no fue encontrado' });
  }

  res.status(201).json(updatedCart);
});

export default router;
