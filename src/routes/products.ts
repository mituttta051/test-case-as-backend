import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { readProducts, writeProducts } from '../utils/fileStorage';
import { Product } from '../types/product';

const router = express.Router();

const categoriesPath = path.join(process.cwd(), 'data/categories.json');
async function readCategories(): Promise<string[]> {
  try {
    const data = await fs.readFile(categoriesPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

// GET /api/products
router.get('/', async (_req, res) => {
  const products = await readProducts();
  res.json(products);
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const products = await readProducts();
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products
router.post('/', async (req, res) => {
  const { title, price, description, category, image  } = req.body;

  if (!title || !price || !description || !image || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const categories = await readCategories();
  if (!categories.includes(category)) {
    return res.status(400).json({ message: `Invalid category: ${category}` });
  }

  const newProduct: Product = {
    id: uuidv4(),
    title,
    price,
    description,
    image,
    category,
    rating: { rate: 0, count: 0 } // default rating
  };

  const products = await readProducts();
  products.push(newProduct);
  await writeProducts(products);

  res.status(201).json(newProduct);
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Prevent rating from being updated
  const { rating, ...updatableFields } = req.body;
  products[index] = { ...products[index], ...updatableFields };

  await writeProducts(products);
  res.json(products[index]);
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  const products = await readProducts();
  const filtered = products.filter((p) => p.id !== req.params.id);

  if (filtered.length === products.length) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await writeProducts(filtered);
  res.status(204).send();
});

export default router;