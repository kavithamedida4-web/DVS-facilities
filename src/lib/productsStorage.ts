import fs from "fs";
import path from "path";
import { Product } from "@/types/product";

const PRODUCTS_FILE_PATH = path.join(process.cwd(), "src", "data", "products.json");

// Fallback initial 20 products if file is ever deleted
import initialProducts from "@/data/products.json";

export function readProductsFromFile(): Product[] {
  try {
    if (!fs.existsSync(PRODUCTS_FILE_PATH)) {
      fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(initialProducts, null, 2), "utf-8");
      return initialProducts as Product[];
    }
    const content = fs.readFileSync(PRODUCTS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as Product[];
    }
    return initialProducts as Product[];
  } catch (err) {
    console.error("Error reading products from file:", err);
    return (initialProducts as Product[]) || [];
  }
}

export function writeProductsToFile(products: Product[]): void {
  try {
    const dir = path.dirname(PRODUCTS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing products to file:", err);
    throw new Error("Failed to save products to storage.");
  }
}

export function getAllProducts(): Product[] {
  return readProductsFromFile();
}

export function getActiveProductsList(): Product[] {
  const all = readProductsFromFile();
  return all
    .filter((p) => p.is_active !== false)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
}

export function addProduct(productData: Omit<Product, "id"> & { id?: string }): Product {
  const products = readProductsFromFile();
  const id = productData.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const newProduct: Product = {
    ...productData,
    id,
    display_order: productData.display_order ?? products.length + 1,
    is_active: productData.is_active ?? true,
    stock_status: productData.stock_status || "in_stock",
    created_at: now,
    updated_at: now,
  };

  products.push(newProduct);
  writeProductsToFile(products);
  return newProduct;
}

export function updateProductById(id: string, updates: Partial<Product>): Product {
  const products = readProductsFromFile();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error(`Product with ID "${id}" not found.`);
  }

  const updatedProduct: Product = {
    ...products[index],
    ...updates,
    id, // protect id from being changed
    updated_at: new Date().toISOString(),
  };

  products[index] = updatedProduct;
  writeProductsToFile(products);
  return updatedProduct;
}

export function deleteProductById(id: string): boolean {
  const products = readProductsFromFile();
  const filtered = products.filter((p) => p.id !== id);

  if (filtered.length === products.length) {
    return false;
  }

  writeProductsToFile(filtered);
  return true;
}

export function resetToDefaults(): Product[] {
  writeProductsToFile(initialProducts as Product[]);
  return initialProducts as Product[];
}
