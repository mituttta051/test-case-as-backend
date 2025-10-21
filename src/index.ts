import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';
import categoriesRouter from './routes/categories';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});