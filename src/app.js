import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de productos y carritos!');
});

app.use(express.json()); 
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${8080}`);
});
