import fs from 'fs/promises';
import path from 'path';
import { Product } from '../types/product';

const filePath = path.resolve('data/products.json');

export async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

export async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8');
}