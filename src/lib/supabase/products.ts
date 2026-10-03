import { supabase, isSupabaseConfigured } from "./client";
import { Product, ProductCategoryGroup } from "@/types/product";

/**
 * Fetch all active products for the public catalog.
 * Uses local API endpoint with Supabase and static fallback.
 */
export async function getActiveProducts(): Promise<Product[] | null> {
  try {
    const res = await fetch("/api/products?active=true", { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data as Product[];
      }
    }
  } catch (err) {
    console.warn("API fetch error, trying Supabase or fallback:", err);
  }

  // Supabase fallback if configured
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .order("name", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (err) {
      console.warn("Supabase fetch failed:", err);
    }
  }

  return null;
}

/**
 * Group a list of products by their category field.
 */
export function groupProductsByCategory(products: Product[]): ProductCategoryGroup[] {
  const map = new Map<string, ProductCategoryGroup["items"]>();

  for (const prod of products) {
    const cat = prod.category || "General Supplies";
    if (!map.has(cat)) {
      map.set(cat, []);
    }
    map.get(cat)!.push({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      original_price: prod.original_price,
      description: prod.description,
      short_description: prod.short_description,
      sku: prod.sku,
      image_url: prod.image_url,
      stock_status: prod.stock_status,
    });
  }

  return Array.from(map.entries()).map(([name, items]) => ({
    name,
    items,
  }));
}

/**
 * Admin: Get all products (active and inactive)
 */
export async function getAllProductsAdmin(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data as Product[];
      }
    }
  } catch (err) {
    console.warn("API fetch error in admin:", err);
  }

  // Supabase fallback if configured
  if (supabase && isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true });

      if (!error && data) {
        return data as Product[];
      }
    } catch (err) {
      console.warn("Supabase admin fetch error:", err);
    }
  }

  return [];
}

/**
 * Admin: Create a new product
 */
export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to create product");
  }

  // Also sync to Supabase if configured
  if (supabase && isSupabaseConfigured) {
    try {
      await supabase.from("products").insert([{
        ...product,
        updated_at: new Date().toISOString(),
      }]);
    } catch (err) {
      console.warn("Supabase sync notice on create:", err);
    }
  }

  return json.data as Product;
}

/**
 * Admin: Update an existing product
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const res = await fetch("/api/products", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates }),
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to update product");
  }

  // Also sync to Supabase if configured
  if (supabase && isSupabaseConfigured) {
    try {
      await supabase
        .from("products")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
    } catch (err) {
      console.warn("Supabase sync notice on update:", err);
    }
  }

  return json.data as Product;
}

/**
 * Admin: Delete a product
 */
export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to delete product");
  }

  // Also sync to Supabase if configured
  if (supabase && isSupabaseConfigured) {
    try {
      await supabase.from("products").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase sync notice on delete:", err);
    }
  }
}

/**
 * Admin: Upload product image strictly to Cloudflare R2
 */
export async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();
  if (res.ok && json.success && json.url) {
    return json.url;
  }

  throw new Error(json.error || "Failed to upload image to Cloudflare R2.");
}

/**
 * Reset / Seed default 20 products
 */
export async function seedDefaultProducts(): Promise<{ count: number }> {
  const res = await fetch("/api/products/reset", {
    method: "POST",
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to reset products");
  }

  return { count: json.data?.length || 20 };
}
