import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('./data/carts.json');

export class CartManager {
  async getCarts() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async saveCarts(carts) {
    await fs.writeFile(filePath, JSON.stringify(carts, null, 2));
  }

  async createCart() {
    const carts = await this.getCarts();
    const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;

    const newCart = {
      id: newId,
      products: [],
    };

    carts.push(newCart);
    await this.saveCarts(carts);

    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id) || null;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cartId);

    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await this.saveCarts(carts);
    return cart;
  }
}
