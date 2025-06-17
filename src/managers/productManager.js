import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('./data/products.json');

export class ProductManager {
  async getProducts() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async getProductById(id) {
  const products = await this.getProducts();
  const product = products.find(p => p.id == id); 

  return product || null; 
}

  async addProduct(productData) {
    const products = await this.getProducts();


    const newId = products.length ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      ...productData,
    };

    products.push(newProduct);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    return newProduct;
  }


  async updateProduct(id, updatedData) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id == id);

    if (index === -1) {
      return null;
    }

    const updatedProduct = {
      ...products[index],
      ...updatedData,
      id: products[index].id, 
    };

    products[index] = updatedProduct;
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));

    return updatedProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === id); 

    if (index === -1) return false;

    products.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return true;
  }
}
