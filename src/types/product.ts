export interface Product {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  short_description?: string | null;
  price?: number | null;
  original_price?: number | null;
  sku?: string | null;
  stock_status: "in_stock" | "low_stock" | "out_of_stock";
  image_url?: string | null;
  images?: string[];
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductCategoryGroup {
  name: string;
  items: {
    id?: string;
    name: string;
    price?: number | null;
    original_price?: number | null;
    description?: string | null;
    short_description?: string | null;
    image_url?: string | null;
    stock_status?: string;
    sku?: string | null;
  }[];
}
