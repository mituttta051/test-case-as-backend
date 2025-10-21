import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

const filePath = path.join(process.cwd(), 'data/categories.json');

// GET /api/categories
router.get('/', async (_req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const categories: string[] = JSON.parse(data);
    res.json(categories);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ message: 'Failed to load categories' });
  }
});

export default router;